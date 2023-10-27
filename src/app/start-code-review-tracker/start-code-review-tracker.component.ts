import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AddCommentsComponent } from '../add-comments/add-comments.component';


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
deleteValue:any


  constructor(private router:Router, private codeService:CodeReviewService,private http:HttpClient,private activatedRoute:ActivatedRoute,
    private dialog:MatDialog){}

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
   
    const dialogRef= this.dialog.open(AddCommentsComponent,{
    })
    dialogRef.afterClosed().subscribe((val:any)=>{
      this.deleteValue=val.value
      console.log(this.deleteValue);
        if(this.deleteValue=='Yes'){
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
    else if(this.deleteValue=='No'){
      console.log('Cancelled deletion');
      
    }
      
    })
   

  }
  onViewSubmittedDetails(rowData:any){
    console.log(rowData);
    localStorage.setItem('projectDetails',JSON.stringify(rowData))


    this.router.navigate(['header/codeReviewTracker',rowData._id,rowData.status])

  }

  gettingStarted(){
    this.router.navigate(['header/codeReviewerDetails'])
  }

 
}
