import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeReviewerDetailsComponent } from './code-reviewer-details/code-reviewer-details.component';
import { StartCodeReviewTrackerComponent } from './start-code-review-tracker/start-code-review-tracker.component';
import { CodeReviewTrackerComponent } from './code-review-tracker/code-review-tracker.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateChecklistComponent } from './create-checklist/create-checklist.component';

const routes: Routes = [
  {path:'',redirectTo:'startCodeReviewTracker',pathMatch:'full'},
  {path:'startCodeReviewTracker',component:StartCodeReviewTrackerComponent},
  {path:'codeReviewerDetails',component:CodeReviewerDetailsComponent,},
  {path:'codeReviewerDetails/:id/:status',component:CodeReviewerDetailsComponent,},
  {path:'codeReviewTracker',component:CodeReviewTrackerComponent},
  {path:'codeReviewTracker',component:HeaderComponent},
  {path:'login',component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'user-management', component:UserManagementComponent},
  {path:'create-checklist', component:CreateChecklistComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
