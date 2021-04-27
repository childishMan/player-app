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
  currentSongInfo: Subject<Song> = new Subject<Song>();
  isPaused = false;

  audio = new Audio();

  constructor(
    private api: FileLoaderService
  ) {}

  play(data: Song) {
    if (this.isPaused) {
      this.audio.play();
    } 
    else {
      this.currentSongInfo.next(data);
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
    this.currentSongInfo.next();
    this.isPlaying.next(false);
  }

  pause() {
    this.isPaused = true;
    this.isPlaying.next(false);
    this.audio.pause();
  }
}
