import { AuthService } from './../../service/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({providedIn: 'root'})
export class RedirectAfterLoginGuard implements CanActivate {
    constructor(private authService:AuthService,private router:Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.authService.isAuth()){
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }
}