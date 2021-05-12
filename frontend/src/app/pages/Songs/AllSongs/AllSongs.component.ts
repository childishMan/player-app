import { SongEditComponent } from './../../../components/dialogs/SongEdit/SongEdit.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './../../../../service/api.service';
import { Song } from './../../../../dtos/song';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'AllSongs',
  templateUrl: './AllSongs.component.html',
  styleUrls: ['./AllSongs.component.scss']
})
export class AllSongsComponent implements OnInit {

  songs:Song[] = [];
  isLoading = false;

  constructor(private api:ApiService,private dialog:MatDialog) { }

  ngOnInit() {
    this.refresh();
  }

  openEdit(){
    this.dialog.open(SongEditComponent).afterClosed().subscribe((val)=>{
      if(val){
        this.refresh();
      }
    });
  }

  refresh(){
    this.isLoading = true;
    this.api.get("/songs").subscribe((resp:Song[])=>{
        this.songs = [...resp];
        this.isLoading = false;
    },
    ()=>{
      this.isLoading = false;
    })
  }

}
