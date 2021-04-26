import { login } from './../../../../dtos/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatus } from 'src/assets/LoginStatus';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss','../Auth.components.scss'],
})
export class LoginComponent implements OnInit {
  loginGroup: FormGroup;
  error: string = '';

  constructor(
    private authService: AuthService,
    private _builder: FormBuilder,
    private router: Router
  ) {
    this.loginGroup = _builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async submit() {
    this.loginGroup.markAllAsTouched();
    if (this.loginGroup.valid) {
      let model: login = {
        password: this.loginGroup.get('password')?.value,
        email: this.loginGroup.get('email')?.value,
      };

      this.authService.login(model).subscribe((status:LoginStatus)=>{
        switch(status){
          case LoginStatus.Success:{
            this.router.navigate(['']);
            break;
          }
          case LoginStatus.Invalid:{
            this.error='Invalid login data'
            break;
          }
          case LoginStatus.Fail:{
            this.error = 'An error occured, try again later';
            break;
          }
        }
      })
    }
  }

  getError(control: string): boolean {
    let ctr = this.loginGroup.get(control);

    if (ctr) {
      return ctr.touched && (ctr.errors != null || ctr.errors != undefined);
    }

    return false;
  }
}
