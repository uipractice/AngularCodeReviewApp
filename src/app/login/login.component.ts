// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: any;
  password: any;
  //handleUpdateResponse: any;
  handleError: any;

  constructor(private authService: AuthService,private router:Router) {}

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
    this.router.navigate(['/startCodeReviewTracker'])
    
    }
    
  })
    
  
}
}

