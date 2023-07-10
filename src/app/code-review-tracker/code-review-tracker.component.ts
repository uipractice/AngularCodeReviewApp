import { Component,OnInit } from '@angular/core';
import { CodeReviewService } from '../code-review.service';



@Component({
  selector: 'app-code-review-tracker',
  templateUrl: './code-review-tracker.component.html',
  styleUrls: ['./code-review-tracker.component.css']
})
export class CodeReviewTrackerComponent {
  /*codeReviewData:any
  selectOptions:any
  starRating =0
  reviewDetailsHeader:string='Performance'
  selectelTabCheckList:any*/

  selected = 'option2';

/*
  constructor(private codeService:CodeReviewService){}
  ngOnInit(): void {
    this.codeService.getReviewTrackerDetails(this.reviewDetailsHeader).subscribe((res:any)=>{
      console.log(res.data[0].data[0]);
      this.selectelTabCheckList=res.data[0].data[0]
      console.log(this.selectelTabCheckList.key);
    })




    this.codeService.getOptions().subscribe((res:any)=>{
      this.selectOptions=res.data[0].options

    })


  }
*/

/*
 onTabData(id:any){

  }
  getRating(rating:any){
    console.log(rating);
  }
}*/



}


