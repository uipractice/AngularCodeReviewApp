import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { CodeReviewTrackerComponent } from '../code-review-tracker/code-review-tracker.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodeReviewerDetailsComponent } from '../code-reviewer-details/code-reviewer-details.component';
import { SharedModule } from '../shared/shared.module';





@NgModule({
  declarations: [
    CodeReviewTrackerComponent,
    CodeReviewerDetailsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    CodeReviewTrackerComponent,
  ]
})
export class UserModule { }
