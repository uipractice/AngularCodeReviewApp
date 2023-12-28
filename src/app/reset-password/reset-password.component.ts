import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpHeaders } from '@angular/common/http';
import { AbstractControl, Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  forgotPasswordForm: any = FormGroup;

  constructor(private authService: AuthService, private router: Router,
    private codeService: CodeReviewService, private renderer: Renderer2,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });

    // Subscribe to value changes and compare passwords
    this.forgotPasswordForm.valueChanges.subscribe(() => {
      this.comparePasswords();
    });

    this.resetPasswordToken = this.route.snapshot.params['authToken'];
    console.log('Reset password Token :', this.resetPasswordToken);
    this.renderer.addClass(document.body, 'hide-header');
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  comparePasswords() {
    const password = this.forgotPasswordForm.get('newPassword').value;
    const confirmPassword = this.forgotPasswordForm.get('confirmPassword').value;

    // Compare passwords and set a custom error if they don't match
    if (password === confirmPassword) {
      this.forgotPasswordForm.get('confirmPassword').setErrors(null);
    } else {
      this.forgotPasswordForm.get('confirmPassword').setErrors({ mismatch: true });
    }
  }

  onResetPassword() {
    console.log('Updated password is : ', this.forgotPasswordForm.value.newPassword);
    console.log('Reset password token is : ', this.forgotPasswordForm.value.confirmPassword);

    this.newPassword = this.forgotPasswordForm.value.newPassword;
    this.confirmPassword = this.forgotPasswordForm.value.confirmPassword;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    let dataDetails = {
      // "resetToken": 'abv',
      "resetToken": this.resetPasswordToken,
      "password": this.newPassword
    }
    if (this.forgotPasswordForm.valid) {
      this.codeService.resetPasswordOnAuthorization(dataDetails, headers).subscribe({
        next: (res: any) => {
          console.log(res.message);
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.log(err.error.message);
        }
      })
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'hide-header');
  }
}
