import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploadComponent } from 'src/app/components/dialogs/ImageUpload/ImageUpload.component';
import { SuccessComponent } from 'src/app/components/dialogs/Success/Success.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerGroup: FormGroup;
  error = '';

  constructor(
    private dialog: MatDialog,
    private _builder: FormBuilder,
    private api: AuthService,
    private router: Router,
    private auth: AuthService
  ) {
    this.registerGroup = _builder.group({
      nickname: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      re_password: ['', [Validators.required]],
      imageUrl: [''],
    });
  }

  ngOnInit() {}

  submit() {
    this.error = '';
    this.registerGroup.markAllAsTouched();

    if (this.registerGroup.valid) {
      let pw = this.registerGroup.get('password')?.value;
      let rpw = this.registerGroup.get('re_password')?.value;

      if (pw != rpw) {
        this.registerGroup.get('re_password')?.setErrors({
          notSame: true,
        });
      } else {
        this.api.register(this.registerGroup.value).subscribe(
          () => {
            this.dialog
              .open(SuccessComponent)
              .afterClosed()
              .subscribe(() => {
                let model = {
                  email: this.registerGroup.get('email')?.value,
                  password: this.registerGroup.get('password')?.value,
                };

                if (model.email && model.password) {
                  this.auth.login(model);
                }
                  this.router.navigate([''])
              });
          },
          (err: HttpErrorResponse) => {
            switch (err.status) {
              case 409: {
                this.error = 'Email already claimed';
                break;
              }
              case 400: {
                this.error = 'Bad data provided';
                break;
              }
              default: {
                this.error = 'Internal error';
                break;
              }
            }
          }
        );
      }
    }
  }

  openDialog() {
    this.dialog
      .open(ImageUploadComponent)
      .afterClosed()
      .subscribe((val: string) => {
        this.registerGroup.patchValue({
          imageUrl: val,
        });
      });
  }
}
