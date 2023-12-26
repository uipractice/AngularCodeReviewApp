import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from '../user-management/user-management.component';
import { SignupComponent } from '../signup/signup.component';
import { CodereviewManagementComponent } from '../codereview-management/codereview-management.component';
import { CreateChecklistComponent } from '../create-checklist/create-checklist.component';
import { TechnicalStackComponent } from '../technical-stack/technical-stack.component';
import { ChecklistDetailsComponent } from '../checklist-detalis/checklist-detalis.component';

const routes: Routes = [
  { path: 'user-management', component: UserManagementComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'codereview-managment', component: CodereviewManagementComponent },
  { path: 'create-checklist', component: CreateChecklistComponent },
  { path: 'technical-stack', component: TechnicalStackComponent },
  { path: 'checklist-details/:techname/:id', component: ChecklistDetailsComponent }







];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
