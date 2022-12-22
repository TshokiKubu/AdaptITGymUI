import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../models/user';
import { Loginvm } from '../models/loginvm';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl: string = "http://localhost:61743/api/v1/Users";
  public isAuthenticated: boolean = false;

  constructor(private api: HttpClient,private localStorage:LocalStorageService) {
    if (this.localStorage.get("Obj")) {
      this.isAuthenticated = true;
    }
  }

  register(formData: FormData) {
    return this.api.post<user>(this.baseUrl + "/register", formData);
  }
  login(loginUser: Loginvm) {
    return this.api.post<any>(this.baseUrl + "/authenticate", loginUser);
  }
  logout() {
    return this.api.post<any>(this.baseUrl + "/logout", null);
}
 
}
