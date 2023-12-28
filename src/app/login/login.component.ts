// login.component.ts

import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpHeaders } from '@angular/common/http';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email: any;
  password: any;
  handleUpdateResponse: any;
  handleError: any;
  auth_token = ''
  userRole: any
  public showPassword: boolean = false;
  loginForm: FormGroup | any;
  activationLinkForm: FormGroup | any;
  currentForm: string = 'form1';
  activationEmail: string = '';

  showForm(formName: string) {
    this.currentForm = formName;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(private authService: AuthService, private router: Router, private codeService: CodeReviewService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: new FormControl('', Validators.required)
    })

    this.activationLinkForm = new FormGroup({
      activationEmail: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    })

    this.renderer.addClass(document.body, 'hide-header');
  }

  onSubmit() {
    console.log('login value', this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      if (res.success == true) {

        console.log('login', res);
        localStorage.setItem('auth_token', JSON.stringify(res.token))
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.auth_token}`
        });
        this.auth_token = JSON.parse(localStorage.getItem('auth_token') || '{}')
        console.log('auth token', this.auth_token);
        this.getUserDetails()

        // this.router.navigate(['/startCodeReviewTracker'])
        this.router.navigate(['/header/user'])
      }
    })
  }

  onSendLinkToMail() {
    console.log('activation link sending to mail : ', this.activationLinkForm.value.activationEmail);

    this.activationEmail = this.activationLinkForm.value.activationEmail;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    let dataDetails = {
      "email": this.activationEmail
    }
    this.codeService.sendLinkTokenToMail(dataDetails, headers).subscribe({
      next: (res: any) => {
        console.log(res.message);
        this.showForm('form3');
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  getUserDetails() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });

    this.codeService.getUserDetails(headers).subscribe((res: any) => {
      localStorage.setItem('user Details', JSON.stringify(res.data))
      this.userRole = res.data.role
      console.log('userdetails', res)
      console.log('role', res.data.role)
    })
    this.codeService.userDetails.next(this.userRole)
  }

  routeToLogin() {
    // this.router.navigate(['/login'])
    this.showForm('form1');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'hide-header');
  }
}



