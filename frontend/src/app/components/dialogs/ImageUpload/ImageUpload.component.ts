import { ApiService } from './../../../../service/api.service';
import { Component, OnInit, Output } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { FileService } from 'src/service/file.service';
import { FileType } from 'src/static/fileTypes';
import { FileConverterService } from 'src/service/file-converter.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BlockScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'image-upload',
  templateUrl: './ImageUpload.component.html',
  styleUrls: ['./ImageUpload.component.scss', '../Overall.scss'],
})
export class ImageUploadComponent implements OnInit {
  @Output() fileName = '';

  defaultImage = 'assets/images/transparent.png';
  supportedTypes: string[] = ['jpg', 'jpeg', 'png'];

  actualFile: string | Blob | SafeResourceUrl = '';
  isUploaded = false;
  isLoading = false;
  isUploading = false;
  error = '';

  

  private file:any;

  constructor(
    private fileApi: FileService,
    private converter: FileConverterService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  getImagePath(): string | Blob | SafeResourceUrl {
    return this.actualFile ? this.actualFile : this.defaultImage;
  }

  getDropLabel(): string {
    return this.actualFile ? '' : 'Drop image here';
  }

  dropped(data: NgxFileDropEntry[]) {
    this.error = ''
    this.isUploaded = false;

    if (data[0]?.fileEntry.isFile) {
      let actualFile = data[0].fileEntry as FileSystemFileEntry;
      actualFile.file((file: File) => {
        this.validateFile(file);
      });
    } else {
      this.error = 'Error while loading file';
    }
  }

  loaded(data: any) {
    this.error = '';
    this.isUploaded = false;
    let file = data.target.files[0] as File;

    if (file) {
      this.validateFile(file);
    } else {
      this.error = 'Error while loading file';
    }
  }

  validateFile(file: File): boolean {

    let type = file.type.split('/')[1];

    if (!type || !this.supportedTypes.includes(type)) {
      this.error = 'File have incorrect format';
      return false;
    }
    this.isLoading = true;

    this.error = '';
    this.actualFile = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.converter.blobToImage(file as Blob)
    );
    this.file = file;

    this.isLoading = false;

    return true;
  }

  upload() {
    if (this.file) {
      this.isUploading = true;
      this.fileApi.postFile(FileType.Image, this.file).subscribe(
        (uploaded: { path: string }) => {
          if (uploaded && uploaded.path) {
            this.fileName = uploaded.path;
            this.isUploaded = true;
            this.isUploading = false;
          }
        },
        (err) => {
          this.isUploaded = false;
          this.actualFile = '';
          this.fileName = '';
          this.error = 'Error while loading file';
          this.isUploading = false;
          console.log(err);
        }
      );
    }
    else{
      this.error = 'Select file first!';
    }
  }
}
