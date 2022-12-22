import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/app/models/member';
import { LocalStorageService } from 'angular-web-storage';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/alert/alert.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-postmember',
  templateUrl: './postmember.component.html',
  styleUrls: ['./postmember.component.css']
})

export class PostmemberComponent implements OnInit,OnDestroy {

  @ViewChild(AlertComponent) alert!: AlertComponent;
  
    subscriptions: Subscription[]=[];
  
    constructor(private fb: FormBuilder, private service: ApiService, private localStorage:LocalStorageService) { }
  
    ngOnDestroy() {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  
    postMemberForm!: FormGroup;
  
    ngOnInit(): void {
  
  this.getMembersById(this.localStorage.get("Obj").id);
  
      this.postMemberForm = this.fb.group({
        "MemberId":[],
        "Name": ['',Validators.required],
        "Surname":['',Validators.required],
        "Email":['',Validators.required],
        "DateCreated":['',Validators.required]
      });
  
    }
  
    get MemberId() {
      return this.postMemberForm.get('MemberId');
    }
    
    get Name() {
      return this.postMemberForm.get('Name');
    }
     
    get Email() {
      return this.postMemberForm.get('Email');
    }
    get Surname() {
      return this.postMemberForm.get('Surname');
    }
     
    get DateCreated() {
      return this.postMemberForm.get('DateCreated');
    }
    get Subscription() {
      return this.postMemberForm.get('Subscription');
    }
    
    postMember() {
     // this.MemberId.setValue('0');
      if (this.postMemberForm.valid) {
        this.subscriptions[0] = this.service.postMember(this.postMemberForm.value).subscribe(
          null,
          err => {
            this.alert.onError(err);          
          },
          () => {
            this.alert.onSuccess("Member Created Successfully");
            this.postMemberForm.reset();          
            this.getMembersById(this.localStorage.get("Obj").id);
          });
      }
    }
  
  
  resetMember() {
    //  this.MemberId.setValue('0');
      this.postMemberForm.reset();
    }
   putMember() {
      this.subscriptions[2] = this.service.putMember(this.postMemberForm.value).subscribe(null,
        err => {
          this.alert.onError(err);
        }, () => {
          this.alert.onSuccess("Member Updated Successfully");
          this.postMemberForm.reset();
          this.getMembersById(this.localStorage.get("Obj").id);
        });
    }
  editMember(member: Member) {
       
    this.postMemberForm.setValue({
      
      "MemberId": member.MemberId,
      "Name":  member.Name,
      "Surname":  member.Surname,
      "Email":  member.Email,
      "Subscription":  member.Subscription,
      "DateCreated":  member.DateCreated
    });
    }
   
    public p!: number;
    public member: Member[] = [];
    
    getMembersById(id: string) {
      this.subscriptions[1]=this.service.getMemberBId(id).subscribe(res => {
        this.member = res;      
      },
        err => {
          this.alert.onError(err);
        },
        () => {
        
        }
      );
    }
  
  }
  
