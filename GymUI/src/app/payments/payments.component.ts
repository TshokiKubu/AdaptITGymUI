import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/app/models/member';
import { Payment } from 'src/app/models/payment';
import { LocalStorageService } from 'angular-web-storage';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/alert/alert.component';
import { ApiService } from 'src/app/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit,OnDestroy {

  @ViewChild(AlertComponent) alert!: AlertComponent;
  
    subscriptions: Subscription[]=[];
  
    constructor(private fb: FormBuilder, private service: ApiService, private localStorage:LocalStorageService) { }
  
    ngOnDestroy() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  
    postPaymentForm!: FormGroup;
  
    ngOnInit(): void {
  
  this.getMemberById(this.localStorage.get("Obj").id);
  
      this.postPaymentForm = this.fb.group({
        "PaymentId":[],
        "Amount": ['',Validators.required],
        "RenewalDate":['',Validators.required]
      });
  
    }
  
    get PaymentId() {
      return this.postPaymentForm.get('PaymentId');
    }
  
    get Amount() {
      return this.postPaymentForm.get('Amount');
    }
  
    get RenewalDate() {
      return this.postPaymentForm.get('RenewalDate');
    }
     
    postPayment() {
      //this.postPaymentForm.setValue('0');
      if (this.postPaymentForm.valid) {
        this.subscriptions[0] = this.service.postPayment(this.postPaymentForm.value).subscribe(
          null,
          (          err: HttpErrorResponse) => {
            this.alert.onError(err);          
          },
          () => {
            this.alert.onSuccess("Payment Added Successfully");
            this.postPaymentForm.reset();          
            this.getMemberById(this.localStorage.get("Obj").id);
          });
      }
    }
    public members: Member[] = [];
    getMemberById(id: string) {
      this.subscriptions[1]=this.service.getMemberBId(id).subscribe(res => {
        this.members = res;      
      },
        err => {
          this.alert.onError(err);
        },
       
      );
    }
  resetPayment() {
    //  this.PaymentId.setValue('0');
      this.postPaymentForm.reset();
    }
 }

