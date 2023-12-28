import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from '../user-management/user-management.component';
import { MaterialModule } from 'src/material.module';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from '../signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodereviewManagementComponent } from '../codereview-management/codereview-management.component';
import { CreateChecklistComponent } from '../create-checklist/create-checklist.component';
import { TechnicalStackComponent } from '../technical-stack/technical-stack.component';
import { ChecklistDetailsComponent } from '../checklist-detalis/checklist-detalis.component';




@NgModule({
  declarations: [
    UserManagementComponent,
    SignupComponent,
    CodereviewManagementComponent,
    CreateChecklistComponent,
    TechnicalStackComponent,
    ChecklistDetailsComponent
  

  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
    
   
  ],
  exports:[
   UserManagementComponent,
   SignupComponent,
   CodereviewManagementComponent,
   CreateChecklistComponent,
   TechnicalStackComponent,
   ChecklistDetailsComponent
  ]
})
export class AdminModule { }
