import { Component,OnInit } from '@angular/core';
import { CodeReviewService } from '../code-review.service';



@Component({
  selector: 'app-code-review-tracker',
  templateUrl: './code-review-tracker.component.html',
  styleUrls: ['./code-review-tracker.component.css']
})
export class CodeReviewTrackerComponent {
 codeReviewData:any
  selectOptions:any
  starRating =0
  reviewDetailsHeader:number=0
  selectelTabCheckList:any


  selected = 'option2';


  constructor(private codeService:CodeReviewService){}
  ngOnInit(): void {
    this.getReviewDetails()
   


    this.codeService.getOptions().subscribe((res:any)=>{
      this.selectOptions=res.data[0].options

    })


  }
  getReviewDetails(indexValue?:any){
    if(indexValue){
      this.codeService.getReviewTrackerDetails(indexValue+1).subscribe((res:any)=>{
        console.log(res.data[0].data[0]);
        this.selectelTabCheckList=res.data[0].data[0]

        
      })
    }
    else 
    this.codeService.getReviewTrackerDetails(this.reviewDetailsHeader+1).subscribe((res:any)=>{
      console.log(res.data[0].data[0]);
      this.selectelTabCheckList=res.data[0].data[0]

     
    })
   
  }
 




 onTabData(id:any){

  }

  onGetSideSelectedValue(value:any){
    console.log('selected',value.index);
    this.getReviewDetails(value.index)
    
  }
  getRating(rating:any){
    console.log(rating);
  }
}






