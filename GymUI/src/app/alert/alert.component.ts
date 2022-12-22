import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [
  ]
})
export class AlertComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
  private localStorage:LocalStorageService) { }

  ngOnInit(): void {
  }
  public serverErrors = [];
  public showSuccessMsg: boolean = false;
  public showFailureMsg: boolean = false;
  public successMsg: string | undefined;
  //onError(err) {
  //  this.serverErrors = [];
  //  if (err.status === 400) {
  //    Object.keys(err.error.errors).forEach(key => {
  //      this.serverErrors.push(err.error.errors[key][0]);
  //    });
  //  }
  //  else if (err.status === 500) {
  //    console.log(err);
  //    this.serverErrors.push(err.error);
  //  }
  //  else if (err.status === 0) {
  //    console.log(err);
  //    this.serverErrors.push("API Service seems to be down.");
  //  }
  //  this.showFailureMsg = true;
  //  this.showSuccessMsg = false;
  //  //setTimeout(() => {
  //  //  this.showFailureMsg = false;
  //  //}, 5000);
  //}

 onError(err : HttpErrorResponse) { 
    //Handling Tokens Expiration
   this.serverErrors = [];
    if (err.status===401) {
      alert("Your Session Has Expired!");
      this.localStorage.remove("Obj");
      this.authService.isAuthenticated = false;
      this.router.navigate(['./login']);
    }
    else {
      console.log(err);
      this.serverErrors.push();//"We are Working On it");
    }
    this.showFailureMsg = true;
    this.showSuccessMsg = false;
  }

  onSuccess(msg: string) {
    this.successMsg = msg;
    this.showFailureMsg = false;
    this.showSuccessMsg = true;
    setTimeout(() => {
      this.showSuccessMsg = false;
    }, 5000);
  }
}
