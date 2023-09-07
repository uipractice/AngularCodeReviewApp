import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-start-code-review-tracker',
  templateUrl: './start-code-review-tracker.component.html',
  styleUrls: ['./start-code-review-tracker.component.css']
})

export class StartCodeReviewTrackerComponent implements OnInit {
 codeReviewDetailsList=[ ]
 dataSource:any
  displayedColumns:string[]=['index','account','project','developers','reviewersName','codeReviewComments','reviewDate','actions']
element: any;
auth_token=''


  constructor(private router:Router, private codeService:CodeReviewService,private http:HttpClient,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
   
  

    this.onGetReviewDetails()

  }
  onGetReviewDetails(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
  

    this.codeService.getReviewDetails(headers).subscribe((res:any)=>{

      if(res.success==true){
        console.log(res);

        this.codeReviewDetailsList=res.data
        this.dataSource=this.codeReviewDetailsList

      }
    })

  }

  onEditPendingDetails(row:any){
    console.log(row);
    this.router.navigate(['/codeReviewerDetails',row._id,row.status])
  }
  onDeleteCompleteDetails(row:any){
    console.log(row._id);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.onDeleteDetails(row._id,headers).subscribe((res:any)=>{
      console.log(res);

      if(res.success==true){
        this.onGetReviewDetails()
      }
    })


  }
  onViewSubmittedDetails(row:any){
    console.log(row);

    this.router.navigate(['/codeReviewTracker',row._id,row.status])

  }

  gettingStarted(){
    this.router.navigate(['/codeReviewerDetails'])
  }

}
