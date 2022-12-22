import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler,  HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
  })
  export class interceptorService implements HttpInterceptor {
    constructor(private authService: AuthService,
      private router: Router,
      private localStorage: LocalStorageService) { }
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      if (this.authService.isAuthenticated) {      
        return next.handle(req.clone({ headers: new HttpHeaders().set("Authorization", "Bearer " + this.localStorage.get("Obj").tokenJwt) }))
      }
      else {
        return next.handle(req);
      }
    }
  
  }
  