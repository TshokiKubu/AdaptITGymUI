import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private localStorage:LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!this.authService.isAuthenticated) {
      this.router.navigate(['./login']);
      return false;
    }
    else if (route.data['hasRole'] && route.data['hasRole'] !== this.localStorage.get('Obj').role) {
        this.router.navigate(['./accessdenied']);
        return false;
      }

    return true;
  }
}
