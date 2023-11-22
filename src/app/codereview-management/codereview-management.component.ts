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
  technologyList:any
  constructor(private http:HttpClient, private activatedRoute:ActivatedRoute,private router: Router,private codeService:CodeReviewService){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    this.getTechnologyList()

   
    
  }
  getTechnologyList(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getTechnologyDetails(headers).subscribe((res:any)=>{
      console.log(res);
      this.technologyList=res.data
      
    })
  }
  navigateCCheckListPage(name:string,id:any){
    console.log('name',name,'id',id);
    this.router.navigate(['/header/checklist-details',name,id])
    

  }

  CreateChecklist(){
    this.router.navigate(['/header/create-checklist'])
  }

}
