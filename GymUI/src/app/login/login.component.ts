import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { DOCUMENT } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild(AlertComponent) alert!: AlertComponent;
  constructor(@Inject(DOCUMENT) private document: Document, private fb: FormBuilder, private authService: AuthService, private router: Router,private localStorage:LocalStorageService) { }

  userLoginForm!: FormGroup;
  ngOnInit() {
    
    this.userLoginForm = this.fb.group({
      userName: ['Username', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  get ulf() {
    return this.userLoginForm.controls;
  }

  get userName() {
    return this.userLoginForm.get('userName');   }

get password() {
    return this.userLoginForm.get('password');   }


  login() {
    this.authService.login(this.userLoginForm.value).subscribe(
      res => {
        this.localStorage.set("Obj", res);
      },
      err => {
        this.alert.onError(err);
      },
      () => {
        alert("Logged in successfully");
        this.authService.isAuthenticated = true;
        this.router.navigate(['./home']);

      });
     this.resetUser();
  }

  resetUser() {    
      this.userLoginForm.reset();
    }

gmailLogin() {
    //Development
    this.document.location.href = 'http://Localhost:61743/api/Account/signInWithGoogle';
  }

}
