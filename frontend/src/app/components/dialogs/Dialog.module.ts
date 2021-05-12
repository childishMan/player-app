import { CustomComponentsModule } from 'src/app/components/custom-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SongEditComponent } from './SongEdit/SongEdit.component';
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
import {MatCheckboxModule} from '@angular/material/checkbox'

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NgxFileDropModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CustomComponentsModule,
    MatCheckboxModule
  ],
  declarations: [ImageUploadComponent,SuccessComponent,SongEditComponent],
})
export class DialogModule {}
