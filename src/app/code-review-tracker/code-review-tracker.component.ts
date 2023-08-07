import { Component,ElementRef,OnInit,ViewChild } from '@angular/core';
import { CodeReviewService } from '../code-review.service';
import { Form, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { FormatWidth } from '@angular/common';



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
  auth_token=''


  constructor(private codeService:CodeReviewService,private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')

    this.techStackdetails=JSON.parse(localStorage.getItem('techObj')||'{}')
    
    
    this.getOptions()
    this.getSideNavData(this.techStackdetails.technicalStackId,this.techStackdetails.technologiesId)
  this.reviewTrackerForm=this.buildReactiveForm()
    this.getReviewDetails()
//  this. onGetSideSelectedValue()
  
   
  

  }

  buildReactiveForm(){
    this.reviewTrackerForm=this.formBuilder.group({
      checkListArray:this.formBuilder.array([])
      })
  }
 
 
  
  getReviewDetails(){
    this.buildReactiveForm()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
   
      this.codeService.getReviewTrackerDetails(headers,this.techStackdetails.technicalStackId,this.techStackdetails.technologiesId, this.reviewDetailsHeader).subscribe((res:any)=>{
        console.log(res.data[0].data[0]);
        this.selectelTabCheckList=res.data[0].data[0]
        const checkListGroupData=this.reviewTrackerForm.get('checkListArray') as FormArray
        const checkListGroup=this.formBuilder.group({
          key:this.selectelTabCheckList.key,
          value:this.formBuilder.array([])
        })
        const checkListChildGroupData=checkListGroup.get('value') as FormArray
        for(let child of this.selectelTabCheckList.value){
          if(child.options=='' && child.rating=='' && child.achievedRating=='' && child.comments==''){
            const checkListChildGroup=this.formBuilder.group({
              key:child.key,
              options:'',
              rating:'',
              achievedRating:'',
              comments:''
            })
            checkListChildGroupData.push(checkListChildGroup)
          }
          else if(child.value){
            const checkListChildGroup=this.formBuilder.group({
              key:child.key,
              value:this.formBuilder.array([])
            })
            const checkListsubChildGroupData=checkListChildGroup.get('value') as FormArray
            for(let subChild of child.value){
            const checkListsubChildGroup=this.formBuilder.group({
              key:subChild.key,
              options:'',
              rating:'',
              achievedRating:'',
              comments:''  
            })
            

            checkListsubChildGroupData.push(checkListsubChildGroup)
           }
            checkListChildGroupData.push(checkListChildGroup)
            
          }
        }
        checkListGroupData.push(checkListGroup)
      
        
        
      })


   
    }



    

   getCheckListArray(){
    return this.reviewTrackerForm.get('checkListArray') as FormArray
  }
  getChildData(childIndex:number){
    return this.getCheckListArray().at(childIndex).get('value') as FormArray

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
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getOptions(headers).subscribe((res:any)=>{
      this.selectOptions=res.data[0].options

    })

  }

  getSideNavData(stackId:any,techId:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    console.log(stackId,techId,headers);
    
    this.codeService.getSideNav(stackId,techId,headers).subscribe((res:any)=>{
      this.sideNavDetails=res.data[0].leftNav
      
    })
    
  }
 




 

  onGetSideSelectedValue(value?:any){
    this.reviewDetailsHeader=value.tab.textLabel
    this.getReviewDetails()
    
  }
  getRating(rating:any){
    console.log(rating);
  }
}






