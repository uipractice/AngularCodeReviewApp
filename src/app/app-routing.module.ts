import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeReviewerDetailsComponent } from './code-reviewer-details/code-reviewer-details.component';
import { StartCodeReviewTrackerComponent } from './start-code-review-tracker/start-code-review-tracker.component';
import { CodeReviewTrackerComponent } from './code-review-tracker/code-review-tracker.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RoleGuard } from './role.guard';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateChecklistComponent } from './create-checklist/create-checklist.component';
import { CodereviewManagementComponent } from './codereview-management/codereview-management.component';
import { TechnicalStackComponent } from './technical-stack/technical-stack.component';

const routes: Routes = [
  // {path:'',redirectTo:'login',pathMatch:'full'},
  // {path:'login',component:LoginComponent},
  // {path:'userManagement',component:UserManagementComponent},
  // {path:'startCodeReviewTracker',component:StartCodeReviewTrackerComponent},
  // {path:'adminUserList',component:AdminUserListComponent},
  // {path:'codeReviewerDetails',component:CodeReviewerDetailsComponent,},
  // {path:'codeReviewerDetails/:id/:status',component:CodeReviewerDetailsComponent,},
  // {path:'codeReviewTracker/:id/:status',component:CodeReviewTrackerComponent},
  // {path:'signup', component:SignupComponent},
  // {path:'user-management', component:UserManagementComponent},
  // {path:'create-checklist', component:CreateChecklistComponent},
  // {path:'codereview-managment', component:CodereviewManagementComponent},
  // {path:'technical-stack', component:TechnicalStackComponent},
  // {path:'header',component:HeaderComponent}

  //-------------------------------------------------------------------------//

   {path:'',redirectTo:'login',pathMatch:'full'},
   {path:'login',component:LoginComponent},
   {path:'header',component:HeaderComponent, children:[
     {path:'',redirectTo:'startCodeReviewTracker',pathMatch:'full'},
    {path:'userManagement',component:UserManagementComponent},
    {path:'startCodeReviewTracker',component:StartCodeReviewTrackerComponent},
    {path:'adminUserList',component:AdminUserListComponent},
    {path:'codeReviewerDetails',component:CodeReviewerDetailsComponent,},
    {path:'codeReviewerDetails/:id/:status',component:CodeReviewerDetailsComponent,},
    {path:'codeReviewTracker/:id/:status',component:CodeReviewTrackerComponent},
    {path:'signup', component:SignupComponent},
    {path:'user-management', component:UserManagementComponent},
    {path:'create-checklist', component:CreateChecklistComponent},
    {path:'codereview-managment', component:CodereviewManagementComponent},
    {path:'technical-stack', component:TechnicalStackComponent},

   ]}



 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
