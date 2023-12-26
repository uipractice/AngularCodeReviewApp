import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartCodeReviewTrackerComponent } from './start-code-review-tracker/start-code-review-tracker.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'resetPassword/:authToken', component: ResetPasswordComponent },
  {
    path: 'header', component: HeaderComponent, children: [
      { path: '', redirectTo: 'startCodeReviewTracker', pathMatch: 'full' },
      { path: 'startCodeReviewTracker', component: StartCodeReviewTrackerComponent },
      {path:'user',loadChildren:()=>import('./user/user-routing.module').then(m=>m.UserRoutingModule)},
      {path:'admin',loadChildren:()=>import('./admin/admin-routing.module').then(m=>m.AdminRoutingModule)},



    ]
  }







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
