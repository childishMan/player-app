import { SuccessComponent } from './Success/Success.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './ImageUpload/ImageUpload.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NgxFileDropModule,
    MatProgressSpinnerModule
  ],
  declarations: [ImageUploadComponent,SuccessComponent],
})
export class DialogModule {}
