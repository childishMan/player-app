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
  isLoading = false;

  image: string | SafeResourceUrl = 'assets/images/choppa.jpg';

  constructor(public playService:MusicPlayService) {
    playService.isPlaying.subscribe((val)=>{
      this.isPlaying = val && playService.currentSongInfo.id === this.data.id
    })
  }

  ngOnInit() {}

  play() {
    this.playService.play(this.data);
  }

  pause(){
    this.playService.pause();
  }

  stop(){
    this.playService.stop();
  }

  playing():Subject<boolean>{
    return this.playService.isPlaying;
  }
}
