import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';

//import { FormControl} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  @ViewChild(AlertComponent) alert!: AlertComponent;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  public userRegistrationForm!: FormGroup;

  public role = [{ name: 'Admin' }, { name: 'User'}];  
   
 
  
  ngOnInit(): void {
    this.getRoles();
    this.userRegistrationForm = this.fb.group({
      userName: ['', [Validators.required]],     
      password: ['', [Validators.required]],     
      role: ['', [Validators.required]]
    });

    
  }

  getRoles() {            
    return this.role;  
 }  
get urf() {
    return this.userRegistrationForm.controls;
  }

formData = new FormData();

  register() {
    this.formData.append('user', JSON.stringify(this.userRegistrationForm.value));
    this.authService.register(this.formData).subscribe(
      null,
      err => {
        this.alert.onError(err);
       // this.formData.delete("PP");
        this.formData.delete("user");
      },
      () => {
      alert('User Created Successfully');
      this.router.navigate(['./login']);
    });
  }
}
