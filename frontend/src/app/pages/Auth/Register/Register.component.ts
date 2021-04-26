import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploadComponent } from 'src/app/components/dialogs/ImageUpload/ImageUpload.component';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerGroup:FormGroup;

  constructor(private dialog:MatDialog,private _builder:FormBuilder) {
    this.registerGroup = _builder.group({
      nickname:['',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      re_password:['',[Validators.required]],
      imageUrl:['']
    })
   }

  ngOnInit() {
  }

  getImagePath():string{
    return '';
  }

  submit(){
    this.registerGroup.markAllAsTouched();

    if(this.registerGroup.valid){
      
    }
  }

  openDialog(){
    this.dialog.open(ImageUploadComponent).afterClosed().subscribe((val:string)=>{
      this.registerGroup.patchValue({
        imageUrl:val
      })
    });
  }

}
