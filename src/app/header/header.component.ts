import { Component, Input, Renderer2 } from '@angular/core';

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
  interval:any

  @Input('class')
  klass: string | undefined

  @Input()
  ngClass: string | string[] | Set<string> | { [klass: string]: any; } | undefined


  constructor(private codeService:CodeReviewService, private router:Router) {}

  ngOnInit(): void {
    console.log('userdetails',this.userDetails);
    setTimeout(()=>{

    this.interval=  this.getUserDetails()
    },1000)



  }



  getUserDetails(){
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    this.userDetails=JSON.parse(localStorage.getItem('user Details')||'{}')


    this.userName=this.userDetails.firstName
    this.userRole=this.userDetails.role
    console.log('user');

  }


logout() {
  localStorage.clear()
  this.router.navigate(['/login']);

}


/*** Menu */

name = 'Angular 6';
tab : any = 'tab1';
tab1 : any
tab2 : any
tab3 : any
Clicked : boolean | undefined





  onClick(check){
  //    console.log(check);
      if(check==1){
        this.tab = 'tab1';
      }else if(check==2){
        this.tab = 'tab2';
      }else{
        this.tab = 'tab3';
      }

  }



}
