import { FileLoaderService } from './../../../service/file-loader.service';
import { SongEditComponent } from './../dialogs/SongEdit/SongEdit.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/service/auth.service';
import { Subject } from 'rxjs';
import { MusicPlayService } from 'src/service/play.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
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
    uploader: '',
  };

  isPlaying = false;
  isLoading = false;

  id: string = '';

  image: string | SafeResourceUrl = 'assets/images/cover-placeholder.png';

  constructor(
    public playService: MusicPlayService,
    private auth: AuthService,
    private dialog: MatDialog,
    private fileapi: FileLoaderService,
    private sanitizer: DomSanitizer
  ) {
    this.id = auth.id;
  }

  ngOnInit() {
    this.playService.isPlaying.subscribe((val) => {
      this.isPlaying = val && this.playService.currentSongInfo.id === this.data.id;
    });

    if (this.data.coverUrl) {
      this.isLoading = true;
      this.fileapi.getImageUrl(this.data.coverUrl).subscribe((url)=>{
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.isLoading = false;
      },
      ()=>{
        this.isLoading = false;
      })
    }
  }

  play() {
    this.playService.play(this.data);
  }

  pause() {
    this.playService.pause();
  }

  stop() {
    this.playService.stop();
  }

  playing(): Subject<boolean> {
    return this.playService.isPlaying;
  }

  formatPoints(val: number) {
    return val + '%';
  }

  openEdit() {
    this.dialog
      .open(SongEditComponent, {
        data: {
          song: this.data,
        },
      })
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
        }
      });
  }
}
