

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: any;
  password: any;
  //handleUpdateResponse: any;
  handleError: any;
 auth_token=''
 userRole:any


  constructor(private authService: AuthService,private router:Router,private codeService:CodeReviewService) {}

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe((res:any)=>
  {
    if(res.success==true){

    localStorage.setItem('auth_token',JSON.stringify(res.token))
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getUserDetails(headers).subscribe((res:any)=>{
      this.userRole=res.data.role
  
      this.codeService.userDetails.next(res.data.role)
  
      console.log('role',this.userRole)

      if(this.userRole=='admin'){
        this.router.navigate(['/userManagement'])
      }
      else if(this.userRole=='user'){
        this.router.navigate(['/startCodeReviewTracker'])
      }
      
  
    })
    
   


    this.router.navigate(['/startCodeReviewTracker'])


    } 



  })


}

}



