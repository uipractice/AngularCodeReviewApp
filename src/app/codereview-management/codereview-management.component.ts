import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CodeReviewService } from '../code-review.service';

@Component({
  selector: 'app-codereview-management',
  templateUrl: './codereview-management.component.html',
  styleUrls: ['./codereview-management.component.css']
})
export class CodereviewManagementComponent  implements OnInit{
  auth_token:any
  constructor(private http:HttpClient, private activatedRoute:ActivatedRoute,private router: Router,private codeService:CodeReviewService){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
   
    
  }

  CreateChecklist(){
    this.router.navigate(['/header/create-checklist'])
  }

}
