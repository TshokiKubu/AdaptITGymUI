import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router,public localStorage:LocalStorageService) { }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout().subscribe(res => {
      this.authService.isAuthenticated = false;
      this.localStorage.remove("Obj");
      this.router.navigate(['./login']);
    });
  }
}
