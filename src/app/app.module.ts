import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CodeReviewerDetailsComponent } from './code-reviewer-details/code-reviewer-details.component';
import { StartCodeReviewTrackerComponent } from './start-code-review-tracker/start-code-review-tracker.component';
import { CodeReviewTrackerComponent } from './code-review-tracker/code-review-tracker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { primeModule } from 'src/prime.module';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { SignupComponent } from './signup/signup.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { CreateChecklistComponent } from './create-checklist/create-checklist.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    CodeReviewerDetailsComponent,
    StartCodeReviewTrackerComponent,
    CodeReviewTrackerComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    UserManagementComponent,
    CreateChecklistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    primeModule,
    NgbRatingModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatCardModule,



    // MatIconModule,
    // MatButtonModule,
    // MatToolbarModule,
    // MatTabsModule,
    // MatSelectModule,
    // MatFormFieldModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
