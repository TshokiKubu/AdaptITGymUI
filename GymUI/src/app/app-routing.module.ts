

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { GoogleComponent } from './google/google.component';
import { ReadmembersComponent } from './user/readmembers/readmembers/readmembers.component';
import { PostmemberComponent } from './user/postmember/postmember/postmember.component';
import { PaymentsComponent } from './payments/payments.component';


const routes: Routes = [
{ path: 'google', component: GoogleComponent },
{ path: 'home', component: HomeComponent },
{ path: 'readmembers', component: ReadmembersComponent,
        canActivate:[AuthGuardService], data: { hasRole: 'Admin' }
},
{ path: 'postmember', component: PostmemberComponent, 
        canActivate: [AuthGuardService], data: { hasRole: 'Admin' }
},
{ path: 'payments', component: PaymentsComponent, 
        canActivate: [AuthGuardService], data: { hasRole: 'Admin' }
},
 
{ path: 'accessdenied', component: AccessdeniedComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
