import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentsComponent } from './payments/payments.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReadmembersComponent } from './user/readmembers/readmembers/readmembers.component';
import { PostmemberComponent } from './user/postmember/postmember/postmember.component';
import { ErrorComponent } from './error/error.component';
import { GoogleComponent } from './google/google.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularWebStorageModule } from 'angular-web-storage';
import { interceptorService } from './services/interseptor.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,    
    PaymentsComponent, 
    RegisterComponent, 
    LoginComponent,   
    PostmemberComponent,
    ReadmembersComponent,
    ErrorComponent,
    GoogleComponent,
    HomeComponent,
    AlertComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule,
    FormsModule,   
    AngularWebStorageModule   
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: interceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
