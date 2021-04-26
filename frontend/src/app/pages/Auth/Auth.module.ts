import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './Register/Register.component';
import { LoginComponent } from './Login/Login.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from 'src/app/components/dialogs/Dialog.module';
import { MatInputModule} from '@angular/material/input'

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    DialogModule,
    MatInputModule
  ],
  declarations: [RegisterComponent, LoginComponent],
})
export class AuthModule {}
