
// login.component.ts

import { Component, OnInit,  } from '@angular/core';
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
  //handleUpdateResponse: any;
 handleError: any;
 auth_token=''
 userRole:any
 public showPassword: boolean = false;
 loginForm:any=FormGroup

 public togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}
  constructor(private authService: AuthService,private router:Router,private codeService:CodeReviewService) {}
  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)

    })  
  }

  onSubmit() {
    console.log('login value',this.loginForm.value);
    
    
    

    this.authService.login(this.loginForm.value).subscribe((res:any)=>
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
    localStorage.setItem('user Details',JSON.stringify(res.data))
    this.userRole=res.data.role
    console.log('userdetails',res)
    console.log('role',res.data.role)
    

    
    
  })
  // this.codeService.userDetails.next(this.userRole)
}

// ngOnDestroy() {
//   this.renderer.removeClass(document.body, 'hide-header');
// }
}



