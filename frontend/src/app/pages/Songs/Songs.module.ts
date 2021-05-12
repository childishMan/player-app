import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './Songs.component';
import { AllSongsComponent } from './AllSongs/AllSongs.component';
import { CustomComponentsModule } from 'src/app/components/custom-components.module';

const routes: Routes = [
  {
    path: 'all',
    component: AllSongsComponent,
  },
  {
    path: '',
    component: AllSongsComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    CustomComponentsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [SongsComponent, AllSongsComponent],
})
export class SongsModule {}
