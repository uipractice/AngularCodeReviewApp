import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeReviewTrackerComponent } from '../code-review-tracker/code-review-tracker.component';
import { CodeReviewerDetailsComponent } from '../code-reviewer-details/code-reviewer-details.component';

const routes: Routes = [
 { path: 'codeReviewTracker/:id/:status', component: CodeReviewTrackerComponent },
  { path: 'codeReviewerDetails', component: CodeReviewerDetailsComponent, },
  { path: 'codeReviewerDetails/:id/:status', component: CodeReviewerDetailsComponent, },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
