import { Component,OnInit } from '@angular/core';
import { CodeReviewService } from '../code-review.service';



@Component({
  selector: 'app-code-review-tracker',
  templateUrl: './code-review-tracker.component.html',
  styleUrls: ['./code-review-tracker.component.css']
})
export class CodeReviewTrackerComponent implements OnInit {
  codeReviewData:any
  selectOptions:any
  starRating =0

  

  constructor(private codeService:CodeReviewService){}
  ngOnInit(): void {
    this.codeService.getReviewTrackerDetails().subscribe((res:any)=>{
      if(res.success==true){
        console.log('review tracker',res.data[0].data)
        this.codeReviewData=res.data[0].data
        
      }
    })

    this.codeService.getOptions().subscribe((res:any)=>{
      this.selectOptions=res.data[0].options
      
    })

    
  }

  getRating(rating:any){
    console.log(rating);
  }
}
    
    

  

  
  