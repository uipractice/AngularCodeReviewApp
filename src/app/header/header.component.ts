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
 userEmail: string | undefined;
  userRole: any;
  auth_token: any;
  technologies: any;
  

  constructor(private codeService:CodeReviewService, private router:Router) {}

  ngOnInit(): void {
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')

    this.codeService.userDetails.subscribe((res:any)=>{
      this.userRole=res.data.role
    })
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getUserDetails(headers).subscribe((res:any)=>{
        this.userEmail = res.data.email;
        //this.technologies = res.data.name;

       console.log('userdetails',res)
  

     /* (error) => {
        console.error('Error fetching user email: ', error);
      }*/
    })
    this.onGetReviewDetails()



  }
  onGetReviewDetails(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });


    this.codeService.getReviewDetails(headers).subscribe((res:any)=>{

      if(res.success==true){
        console.log('header list',res);


      }
    })

  }

logout() {
 // this.codeService.logout();
  this.router.navigate(['/login']);
}

}
