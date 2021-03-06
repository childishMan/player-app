import { FileService } from 'src/service/file.service';
import { FileConverterService } from 'src/service/file-converter.service';
import { Injectable } from '@angular/core';
import { FileType } from 'src/static/fileTypes';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileLoaderService {
  constructor(
    private converter: FileConverterService,
    private api: FileService
  ) {}

  getImageUrl(imageName: string): Subject<string> {
    let obs = new Subject<string>();

    this.api.getFile(FileType.Image, imageName).subscribe(
      (val: Blob) => {
        let file = this.converter.blobToImage(val);

        if (file) {
          obs.next(file);
        } else {
          obs.error('error while parsing blob');
        }
      },
      (err) => obs.error(err)
    );

    return obs;
  }

  getSong(name: string): Subject<string> {
    let subj = new Subject<string>();

    this.api.getFile(FileType.Audio, name).subscribe(
      (data) => {
        subj.next(this.converter.blobToImage(data));
      },
      (err) => console.log(err)
    );
    return subj;
  }
}
