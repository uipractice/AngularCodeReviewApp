// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: any;
  password: any;
  //handleUpdateResponse: any;
  handleError: any;
  router: any;

  constructor(private authService: AuthService) {}

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe((res:any)=>{

      this.authService.redirectUrl = URL;

      if (this.authService.isLoggedIn) { return true; }
      this.router.navigate(['/testpage']);

      return false;
    console.log(res);
    })
  }
}


