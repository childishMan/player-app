import { Song } from './../../../../dtos/song';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-AllSongs',
  templateUrl: './AllSongs.component.html',
  styleUrls: ['./AllSongs.component.scss']
})
export class AllSongsComponent implements OnInit {

  songs:Song[] = [
    {
    artists:'First song',
    name:'Song actually',
    coverUrl:'',
    id:'1',
    songUrl:'1619523731992;;.mp3'
  },
  {
    artists:'Second song',
    name:'Song actually',
    coverUrl:'',
    id:'2',
    songUrl:'1619522256985tryna.mp3'
  },
]

  constructor() { }

  ngOnInit() {
  }

}
