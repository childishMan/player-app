import { SongCardComponent } from './song-card/song-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { UserBadgeComponent } from './UserBadge/UserBadge.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatDividerModule,
    FormsModule
  ],
  exports: [UserBadgeComponent, CustomInputComponent, SongCardComponent],
  declarations: [UserBadgeComponent, CustomInputComponent, SongCardComponent],
  providers: [],
})
export class CustomComponentsModule {}
