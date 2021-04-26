import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayService {

isPlaying:Subject<boolean> = new Subject<boolean>();

constructor() { 
  setTimeout(()=>{
    this.isPlaying.next(true)
  },5000)
}

}
