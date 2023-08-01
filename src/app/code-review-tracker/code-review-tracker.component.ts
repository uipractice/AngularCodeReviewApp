import { Component,ElementRef,OnInit,ViewChild } from '@angular/core';
import { CodeReviewService } from '../code-review.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-code-review-tracker',
  templateUrl: './code-review-tracker.component.html',
  styleUrls: ['./code-review-tracker.component.css']
})
export class CodeReviewTrackerComponent implements OnInit {
  @ViewChild('subChild') subChild!:ElementRef<HTMLDivElement>
 codeReviewData:any
  selectOptions:any
  starRating =0
  reviewDetailsHeader='Functional'
  selectelTabCheckList:any
  techStackdetails:any
  sideNavDetails:any
  selected = '';
  reviewTrackerForm:any=FormGroup
  checkListChildData:any
  subChildOptions=''

  constructor(private codeService:CodeReviewService,private formBuilder:FormBuilder){}
  ngOnInit(): void {

    this.techStackdetails=JSON.parse(localStorage.getItem('techObj')||'{}')
    console.log(this.techStackdetails.technicalStackId);
    
    
    this.getOptions()
    this.getSideNavData(this.techStackdetails.technicalStackId,this.techStackdetails.technologiesId)
    this.reviewTrackerForm=this.buildReactiveForm()
   
  

  }

  buildReactiveForm(){
    this.reviewTrackerForm=this.formBuilder.group({
      checkListArray:new FormArray([])
      })
  }
 
 
  
  getReviewDetails(){
    this.buildReactiveForm()
   
      this.codeService.getReviewTrackerDetails(this.techStackdetails.technicalStackId,this.techStackdetails.technologiesId, this.reviewDetailsHeader).subscribe((res:any)=>{
        console.log(res.data[0].data[0]);
        this.selectelTabCheckList=res.data[0].data[0]
        const checkListGroupData=this.reviewTrackerForm.get('checkListArray') as FormArray
        const checkListGroup=new FormGroup({
          key:new FormControl(this.selectelTabCheckList.key),
          value:new FormArray([])
        })
        const checkListChildGroupData=checkListGroup.get('value') as FormArray
        for(let child of this.selectelTabCheckList.value){
          if(child.options=='' && child.rating=='' && child.achievedRating=='' && child.comments==''){
            const checkListChildGroup=this.formBuilder.group({
              key:new FormControl(child.key),
              options:new FormControl(''),
              rating:new FormControl(''),
              achievedRating:new FormControl(''),
              comments:new FormControl('')
            })
            checkListChildGroupData.push(checkListChildGroup)
          }
          else if(child.value){
            const checkListChildGroup=this.formBuilder.group({
              key:new FormControl(child.key),
              value:new FormArray([])
            })
            const checkListsubChildGroupData=checkListChildGroup.get('value') as FormArray
            for(let subChild of child.value){
            const checkListsubChildGroup=this.formBuilder.group({
              key:new FormControl(subChild.key),
              options:new FormControl(''),
              rating:new FormControl(''),
              achievedRating:new FormControl(''),
              comments:new FormControl('')  
            })
            

            checkListsubChildGroupData.push(checkListsubChildGroup)
           }
            checkListChildGroupData.push(checkListChildGroup)
            
          }
        }
        checkListGroupData.push(checkListGroup)
        console.log(this.reviewTrackerForm.value.checkListArray[0].key);
        console.log(this.reviewTrackerForm.value.checkListArray[0]);
        
        
      })
      
  
    }



    

   getCheckListArray(){
    return this.reviewTrackerForm.get('checkListArray') as FormArray
  
  }
 
 



  saveCheckListData(){
    console.log(this.reviewTrackerForm.value);
    
  }

  getSubChildSelection(rating:any,name:any){
    console.log('value',rating);
    console.log('name',name);
    this.subChildOptions=rating.value
    const childArray=this.reviewTrackerForm.get('checkListArray').value
    console.log('childArray',childArray);
    
    
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
    this.reviewDetailsHeader=value.tab.textLabel
    this.getReviewDetails()
    
  }
  getRating(rating:any){
    console.log(rating);
  }
}






