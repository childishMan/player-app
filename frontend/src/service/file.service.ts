import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileType } from 'src/static/fileTypes';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiPath = '/api/upload/';

  constructor(private httpClient: HttpClient) {}

  postFile(type: FileType, data: string | Blob): Observable<any> {
    const formData = new FormData();
    formData.append('file', data);
    return this.httpClient.post(this.apiPath + this.typeToString(type), formData);
  }

  getFile(type: FileType, name: string): Observable<any> {
    return this.httpClient.get(this.apiPath + this.typeToString(type) + '/' + name,{headers:{
      'content-type':this.getContentType(type,name),
      'accept-range':type == FileType.Audio?'bytes':''
    },
  responseType:'blob'});
  }

  private typeToString(type: FileType): string {
    let result = '';
    switch (type) {
      case FileType.Audio:
        result = 'song';
        break;
      case FileType.Image:
        result = 'image';
        break;
      default:
        break;
    }

    return result;
  }

  private getExt(filename:string){
    let ext = filename.substr(filename.lastIndexOf('.')+1);
    return  ext === 'jpg'?'jpeg':ext;
  }

  private getContentType(type:FileType,name:string):string{
    let ext = this.getExt(name);
    let result = '';
    switch (type) {
      case FileType.Audio:
        result = 'audio/'+ext;
        break;
      case FileType.Image:
        result = 'image/'+ext;
        break;
      default:
        break;
    }

    return result;
  }
}
