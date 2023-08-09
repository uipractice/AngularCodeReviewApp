// login.component.ts
/*
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'hide-header');
  }



  public loginForm!: FormGroup

  constructor(private renderer: Renderer2, private formbuilder: FormBuilder,private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['', Validators.required]
    })
    this.renderer.addClass(document.body, 'hide-header');

  }
  login(){
    this.http.get<any>("https://cg3zhj7w4a.execute-api.ap-south-1.amazonaws.com/default/api/login")
    .subscribe((res: any[])=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert('Login Succesful');
        this.loginForm.reset()
      this.router.navigate(["home"])
      }else{
        alert("user not found")
      }
    },(_err: any)=>{
      alert("Something went wrong")
    })
  }

}


import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  email: any;
  password: any;
  //handleUpdateResponse: any;
  handleError: any;
 auth_token=''
 userRole:any


  constructor(private authService: AuthService,private router:Router,private codeService:CodeReviewService) {}

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'hide-header');
  }
  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,

    };

    this.authService.login(credentials).subscribe((res:any)=>
  {
    if(res.success==true){

      console.log('login',res);
    localStorage.setItem('auth_token',JSON.stringify(res.token))
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    console.log('auth token',this.auth_token);
    this.getUserDetails()


    this.router.navigate(['/startCodeReviewTracker'])


    }



  })


}

getUserDetails(){
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.auth_token}`
  });

  this.codeService.getUserDetails(headers).subscribe((res:any)=>{
    this.userRole=res.data.role

    this.codeService.userDetails.next(res.data.role)

  })
}
}*/

// login.component.ts

import { Component, Renderer2 } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  email: any;
  password: any;
  //handleUpdateResponse: any;
  handleError: any;
 auth_token=''
 userRole:any


  constructor(private authService: AuthService,private router:Router,private codeService:CodeReviewService, private renderer: Renderer2,) {}

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe((res:any)=>
  {
    if(res.success==true){

      console.log('login',res);
    localStorage.setItem('auth_token',JSON.stringify(res.token))
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    console.log('auth token',this.auth_token);
    this.getUserDetails()


    this.router.navigate(['/startCodeReviewTracker'])


    }



  })


}

ngOnInit(): void {

  this.renderer.addClass(document.body, 'hide-header');

}


getUserDetails(){
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.auth_token}`
  });

  this.codeService.getUserDetails(headers).subscribe((res:any)=>{
    this.userRole=res.data.role

    this.codeService.userDetails.next(res.data.role)

  })
}

ngOnDestroy() {
  this.renderer.removeClass(document.body, 'hide-header');
}
}



