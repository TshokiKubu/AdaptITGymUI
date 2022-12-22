import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(public localStorage:LocalStorageService, public authService: AuthService, public service:ApiService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
}



