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
  reviewDetailsHeader='Functional'
  selectelTabCheckList:any
  techStackdetails:any
  sideNavDetails:any
  selected = 'option2';


  constructor(private codeService:CodeReviewService){}
  ngOnInit(): void {
    this.techStackdetails=JSON.parse(localStorage.getItem('techObj')||'{}')
    console.log(this.techStackdetails.technicalStackId);
    
    this.getReviewDetails()
    this.getOptions()
    this.getSideNavData(this.techStackdetails.technicalStackId,this.techStackdetails.technologiesId)
   

  }
  getReviewDetails(indexValue?:any){
    if(indexValue){
      this.codeService.getReviewTrackerDetails(this.techStackdetails.technicalStackId,this.techStackdetails.technologiesId, indexValue).subscribe((res:any)=>{
        console.log(res.data[0].data[0]);
        this.selectelTabCheckList=res.data[0].data[0]

        
      })
    }
    else 
    this.codeService.getReviewTrackerDetails(this.techStackdetails.technicalStackId,this.techStackdetails.technologiesId, ).subscribe((res:any)=>{
      console.log(res.data[0].data[0]);
      this.selectelTabCheckList=res.data[0].data[0]

     
    }
    )
    
   
  }
  
  getOptions(){
    this.codeService.getOptions().subscribe((res:any)=>{
      this.selectOptions=res.data[0].options

    })

  }

  getSideNavData(stackId:any,techId:any){
    this.codeService.getSideNav(stackId,techId).subscribe((res:any)=>{
      this.sideNavDetails=res.data[0].leftNav
      
    })
    
  }
 




 onTabData(id:any){

  }

  onGetSideSelectedValue(value:any){
    console.log('selected',value.tab.textLabel);
    this.getReviewDetails(value.tab.textLabel)
    
  }
  getRating(rating:any){
    console.log(rating);
  }
}






