import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileConverterService {

constructor() { }

blobToImage(blob:Blob):any{
    return URL.createObjectURL(blob);
}

}
