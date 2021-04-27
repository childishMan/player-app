import { SongCardComponent } from './song-card/song-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { UserBadgeComponent } from './UserBadge/UserBadge.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [UserBadgeComponent, CustomInputComponent,SongCardComponent],
  declarations: [UserBadgeComponent, CustomInputComponent,SongCardComponent],
  providers: [],
})
export class CustomComponentsModule {}
