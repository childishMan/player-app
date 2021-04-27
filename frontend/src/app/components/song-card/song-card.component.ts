import { Subject } from 'rxjs';
import { MusicPlayService } from 'src/service/play.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Song } from './../../../dtos/song';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss'],
})
export class SongCardComponent implements OnInit {
  @Input() data: Song = {
    artists: '',
    coverUrl: '',
    songUrl: '',
    id: '',
    name: '',
  };

  isPlaying = false;

  image: string | SafeResourceUrl = 'assets/images/choppa.jpg';

  constructor(private playService:MusicPlayService) {
  }

  ngOnInit() {}

  play() {
    this.playService.play(this.data);
  }

  pause(){
    this.playService.pause();
  }

  playing():Subject<boolean>{
    return this.playService.isPlaying;
  }
}
