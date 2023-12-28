import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CodeReviewService } from '../code-review.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  auth_token: string = ''
  activeStatus: number = 0
  role: string = 'admin'
  constructor(private FormBuilder: FormBuilder, private http: HttpClient, private codeService: CodeReviewService, private router: Router) { }

  ngOnInit(): void {
    this.auth_token = JSON.parse(localStorage.getItem('auth_token') || '{}')

    this.signupForm = this.FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', Validators.required],
      role: ['', Validators.required],


    })

  }
  isAdmin(value: any) {
    console.log('toggle value', value.checked);
    if (value.checked == true) {
      this.role = 'user'
      console.log('active', this.activeStatus, 'role', this.role);
    }
    else {
      this.role = 'admin'
      console.log('active', this.activeStatus, 'role', this.role);
      console.log('name', this.signupForm.get('firstName')?.value);


    }


  }
  onSelectRole(value) {
    console.log('selectec value', value);


  }
  signUp() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    let userData = {
      "firstName": this.signupForm.get('firstName')?.value,
      "lastName": this.signupForm.get('lastName')?.value,
      "email": this.signupForm.get('email')?.value,
      "password": this.signupForm.get('password')?.value,
      "isActive": 1,
      "role": this.signupForm.get('role')?.value,

    }
    console.log('user data', userData);

    this.codeService.createUser(userData, headers).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/header/admin/user-management'])

    })






  }

  onCancel() {
    this.router.navigate(['/header/admin/user-management'])
  }
}


