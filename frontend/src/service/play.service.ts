import { DomSanitizer } from '@angular/platform-browser';
import { FileLoaderService } from './file-loader.service';
import { Song } from './../dtos/song';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayService {
  isPlaying: Subject<boolean> = new Subject<boolean>();
  currentSongInfo: Song = { id: '' };
  isPaused = false;

  private audio = new Audio();

  constructor(private api: FileLoaderService) {
    this.audio.addEventListener("ended",(event)=>{
      this.isPlaying.next(false);
    })
  }

  play(data: Song) {
    if (this.isPaused && data.id === this.currentSongInfo.id) {
      this.isPlaying.next(true);
      this.audio.play();
    } else if (data.songUrl) {
      this.currentSongInfo = data;
      this.api.getSong(data.songUrl).subscribe((link) => {
        this.audio.src = link;
        this.audio.load();
        this.audio.play();
        this.isPlaying.next(true);
      });
    }
  }

  stop() {
    this.isPaused = false;
    this.audio.pause();
    this.currentSongInfo = { id: '' };
    this.isPlaying.next(false);
  }

  pause() {
    this.isPaused = true;
    this.isPlaying.next(false);
    this.audio.pause();
  }

  changeVolume(val: number | null) {
    if (val) {
      this.audio.volume = val / 100.0;
    }
  }

  getVolume():number{
    return this.audio.volume*100;
  }
}
