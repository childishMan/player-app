import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './Songs.component';
import { AllSongsComponent } from './AllSongs/AllSongs.component';
import { NewSongComponent } from './NewSong/NewSong.component';
import { CustomComponentsModule } from 'src/app/components/custom-components.module';

const routes: Routes = [{
  path:'all',component:AllSongsComponent
},
{
  path:'new',component:NewSongComponent
},
{
  path:'edit/:id',component:NewSongComponent
},
{
  path:'',component:AllSongsComponent
}
];
@NgModule({
  imports: [CommonModule, FlexLayoutModule,RouterModule.forChild(routes),CustomComponentsModule],
  declarations: [SongsComponent,AllSongsComponent,NewSongComponent],
})
export class SongsModule {}
