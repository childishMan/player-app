import { AuthService } from 'src/service/auth.service';
import { Component } from '@angular/core';
import { MusicPlayService } from 'src/service/play.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  isPlaying = false;

  constructor(private authService:AuthService,private playService:MusicPlayService) {
    playService.isPlaying.subscribe((val)=>this.isPlaying = val)
  }

  isAuth():boolean{
    return this.authService.isAuth();
  }

  logout(){
    this.authService.logout();
  }

  getClass():string{
    console.log('tick');
    return this.isPlaying?"visual":"init";
  }
}
