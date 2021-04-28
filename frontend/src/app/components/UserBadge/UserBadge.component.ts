import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FileLoaderService } from './../../../service/file-loader.service';
import { UserInfo } from './../../../dtos/userInfo';
import { AuthService } from 'src/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-badge',
  templateUrl: './UserBadge.component.html',
  styleUrls: ['./UserBadge.component.scss'],
})
export class UserBadgeComponent implements OnInit {
  data: UserInfo;
  defaultImage = 'assets/images/choppa.jpg';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private fileLoader: FileLoaderService,
    private sanitizer:DomSanitizer,
    private router:Router
  ) {
    this.data = { nickname: '', email: '', imageUrl: '' };
  }

  ngOnInit() {
    this.data = this.authService.getUserInfo();
    if (this.data.imageUrl) {
      this.isLoading = true;
      this.fileLoader.getImageUrl(this.data.imageUrl.toString()).subscribe(
        (file: any) => {
          this.data.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(file);
          this.isLoading = false;
        },
        () => {
          this.data.imageUrl = this.defaultImage;
          this.isLoading = false;
        }
      );
    } 
    else {
      this.data.imageUrl = this.defaultImage;
    }
  }

  logout() {
    this.authService.logout();
  }

  redirect(path:string){
    this.router.navigate([path]);
  }
}
