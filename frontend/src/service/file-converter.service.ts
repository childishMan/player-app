import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileConverterService {

constructor() { }
//mb implement file conversion in future
blobToImage(blob:Blob):any{
    return URL.createObjectURL(blob);
}

}
