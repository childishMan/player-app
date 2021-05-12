import { ApiService } from './../../../../service/api.service';
import { AuthService } from 'src/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Song } from 'src/dtos/song';
import { ImageUploadComponent } from '../ImageUpload/ImageUpload.component';
import { FileType } from 'src/static/fileTypes';

@Component({
  selector: 'app-SongEdit',
  templateUrl: './SongEdit.component.html',
  styleUrls: ['./SongEdit.component.scss'],
})
export class SongEditComponent implements OnInit {
  form: FormGroup;
  song: Song = new Song();
  isEdit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private _builder: FormBuilder,
    private auth: AuthService,
    private dialog: MatDialog,
    private ref: MatDialogRef<SongEditComponent>,
    private api: ApiService
  ) {
    this.form = _builder.group({
      id: [''],
      name: ['', [Validators.required]],
      songUrl: ['', [Validators.required]],
      artists: ['', [Validators.required]],
      uploader: [auth.id, Validators.required],
      coverUrl: [''],
      isPublic: false
    });

    if (data && data.song) {
      this.isEdit = true;
      this.song = data.song as Song;
      this.form.patchValue({
        name: this.song.name,
        artists: this.song.artists,
        coverUrl: this.song.coverUrl,
        songUrl: this.song.songUrl,
        uploader: auth.id,
        id: this.song.id,
        isPublic:this.song?.isPublic ?? false
      });
    }
  }

  ngOnInit() {}

  openImageUpload() {
    this.dialog
      .open(ImageUploadComponent, {
        data: {
          type: FileType.Image,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.form.patchValue({
            coverUrl: val,
          });
        }
      });
  }

  openAudioDialog() {
    this.dialog
      .open(ImageUploadComponent, {
        data: {
          type: FileType.Audio,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.form.patchValue({
            songUrl: val,
          });
        }
      });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.api.post('songs/', this.form.value).subscribe(() => {
        if (this.isEdit) this.ref.close(this.form.value);
        else this.ref.close(true);
      });
    }
  }
}
