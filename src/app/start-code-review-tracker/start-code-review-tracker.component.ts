import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-start-code-review-tracker',
  templateUrl: './start-code-review-tracker.component.html',
  styleUrls: ['./start-code-review-tracker.component.css']
})

export class StartCodeReviewTrackerComponent implements OnInit {
 codeReviewDetailsList=[ ]
 dataSource=[]
  displayedColumns:string[]=['index','account','project','developers','reviewersName','codeReviewComments','reviewDate','actions']
  
  
  constructor(private router:Router, private codeService:CodeReviewService,private http:HttpClient,private activatedRoute:ActivatedRoute){}
  
  ngOnInit(): void {
  
    this.onGetReviewDetails()
    
  }
  onGetReviewDetails(){
    
    this.codeService.getReviewDetails().subscribe((res:any)=>{
      
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
    
    this.codeService.onDeleteDetails(row._id).subscribe((res:any)=>{
      console.log(res);
      
      if(res.success==true){
        this.onGetReviewDetails()
      }
    })
  
   
  }
  onViewSubmittedDetails(row:any){
    console.log(row);
    
    this.router.navigate(['/codeReviewerDetails',row._id,row.status])

  }

  gettingStarted(){
    this.router.navigate(['/codeReviewerDetails'])
  }

}
