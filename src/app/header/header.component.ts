import { Component, Renderer2 } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { CodeReviewService } from '../code-review.service';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userDetails:any
  userName:any
  userRole: any;
  auth_token: any;
  technologies: any;
  

  constructor(private codeService:CodeReviewService, private router:Router) {}

  ngOnInit(): void {
    console.log('userdetails',this.userDetails);
    
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    this.userDetails=JSON.parse(localStorage.getItem('user Details')||'{}')
  
    this.userName=this.userDetails.firstName
    this.userRole=this.userDetails.role
    console.log('username',this.userName,'userRole',this.userRole);
    
  }
  

logout() {
  localStorage.clear()
  this.router.navigate(['/login']);
}

}
