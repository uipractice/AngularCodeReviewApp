import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpHeaders } from '@angular/common/http';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent {
  newPassword: any;
  confirmPassword: any;
  handleUpdateResponse: any;
  handleError: any;
  auth_token = '';
  resetPasswordToken = '';
  userRole: any
  public showPassword: boolean = false;
  forgotPasswordForm: any = FormGroup

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(private authService: AuthService, private router: Router,
    private codeService: CodeReviewService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    })

    this.renderer.addClass(document.body, 'hide-header');
  }

  onSubmit() {
    console.log('login value', this.forgotPasswordForm.value);

    this.authService.login(this.forgotPasswordForm.value).subscribe((res: any) => {
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
        this.router.navigate(['/header'])
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

  onResetPassword() {
    console.log('Updated password is : ', this.forgotPasswordForm.value);
    console.log('Reset password token is : ', this.forgotPasswordForm.value);

    this.newPassword = this.forgotPasswordForm.value.newPassword;
    this.confirmPassword = this.forgotPasswordForm.value.confirmPassword;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    let dataDetails = {
      // "resetToken": "",
      // "password": "Login@cra1"
      "resetToken": this.resetPasswordToken,
      "password": this.newPassword
    }
    // this.codeService.resetPasswordOnAuthorization(dataDetails, headers).subscribe((res: any) => {
    //   console.log(res);
    //   if(res.success == true) {}
    // })
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'hide-header');
  }
}
