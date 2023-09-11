import { Component,ElementRef,OnInit,ViewChild } from '@angular/core';
import { CodeReviewService } from '../code-review.service';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, ValidationErrors, Validators,  } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentsComponent } from '../add-comments/add-comments.component';


@Component({
  selector: 'app-code-review-tracker',
  templateUrl: './code-review-tracker.component.html',
  styleUrls: ['./code-review-tracker.component.css']
})
export class CodeReviewTrackerComponent implements OnInit {
  // @ViewChild('subChild') subChild!:ElementRef<HTMLDivElement>
  selectOptions:any
  reviewDetailsHeader='Functional'
  selectelTabCheckList:any
  techStackdetails:any
  sideNavDetails:any
  reviewTrackerForm:any=FormGroup
  auth_token=''
  isDisabledRating:boolean[]=[]
  isDisabledAchievedRating:boolean=true
  isActiveComments:boolean=false
  disableSave:boolean=false
  showSummary:boolean=false
  summaryArray:any[]=[]
  summaryPercentage:any

  


  constructor(private codeService:CodeReviewService,private formBuilder:FormBuilder, public dialog: MatDialog){}
  ngOnInit(): void {
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    console.log('auth toke in review tracker',this.auth_token);


    this.techStackdetails=JSON.parse(localStorage.getItem('techObj')||'{}')

    this.buildReactiveForm()
    this.getSideNavData(this.techStackdetails.technicalStackId,this.techStackdetails.technologiesId)

    this.getOptions()
    this.getReviewDetails()




  }

  buildReactiveForm(){
    this.reviewTrackerForm=this.formBuilder.group({
      key:new FormControl(this.reviewDetailsHeader,Validators.required),
      value:new FormArray([])
      })
  }



  getReviewDetails(){

    this.buildReactiveForm()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });

      this.codeService.getReviewTrackerDetails(headers,this.techStackdetails.technicalStackId,this.techStackdetails.technologiesId, this.reviewDetailsHeader).subscribe((res:any)=>{
        console.log(res.data[0].data[0].value);
        this.selectelTabCheckList=res.data[0].data[0]


        const checkListChildGroupData=this.reviewTrackerForm.get('value') as FormArray
        for(let child of this.selectelTabCheckList.value){
          if(child.options=='' && child.rating=='' && child.achievedRating=='' && child.comments==''){
            const checkListChildGroup=new FormGroup({
              key:new FormControl(child.key,Validators.required),
              options:new FormControl(child.options,Validators.required),
              rating:new FormControl(child.rating,Validators.required),
              achievedRating:new FormControl(child.achievedRating,[Validators.required, 
              Validators.min(0),
            Validators.max(5),
            Validators.pattern(/^\d*\.?\d*$/)
          ]),
              comments:new FormControl(child.comments)
            })
            checkListChildGroupData.push(checkListChildGroup)
          }
          else if(child.value){
            const checkListChildGroup=new FormGroup({
              key:new FormControl(child.key,Validators.required),
              value:new FormArray([])
            })
            const checkListsubChildGroupData=checkListChildGroup.get('value') as FormArray
            for(let subChild of child.value ){
            const checkListsubChildGroup=new FormGroup({
              key:new FormControl(subChild.key,Validators.required),
              options:new FormControl(subChild.options,Validators.required),
              rating:new FormControl(subChild.rating,Validators.required),

              achievedRating:new FormControl(subChild.achievedRating,[Validators.required, 
                Validators.min(0),
              Validators.max(5),
              Validators.pattern(/^\d*\.?\d*$/)
            ]),
              comments:new FormControl(subChild.comments)
            })


            checkListsubChildGroupData.push(checkListsubChildGroup)
           }
            checkListChildGroupData.push(checkListChildGroup)

          }
        }
      })
    }


  
  saveCheckListData(valid:any){
    console.log(this.reviewDetailsHeader);
    
    let rating=0
    let achievedRating=0
    console.log(valid);
    
    console.log(this.reviewTrackerForm.value);
    let data=this.reviewTrackerForm.value.value
    for(let i=0;i<data.length;i++){
      if(data[i].value){
        console.log(data[i].value);

        for(let j=0;j<data[i].value.length;j++){
               
      rating=rating+ +data[i].value[j].rating
      achievedRating=achievedRating+ +data[i].value[j].achievedRating

        }
        
 

      
    }
    else{
      console.log(data[i].key);
      console.log(data[i].rating);
      rating=rating+ +data[i].rating
      achievedRating=achievedRating+ +data[i].achievedRating
    }
    
    
  }
  console.log('total rating',rating);
  console.log('total rating',achievedRating)
  let summaryObj={
    'id':this.reviewDetailsHeader,
    'rating':rating,
    'achievedRating':achievedRating
  }

  const existingObj = this.summaryArray.find(obj => obj.id === summaryObj.id)

  if(existingObj){
    for(let i=0;i<this.summaryArray.length;i++){
      if(this.summaryArray[i]['id']==existingObj.id){
      this.summaryArray[i]['rating']=summaryObj.rating
      this.summaryArray[i]['achievedRating']=summaryObj.achievedRating
      }
      console.log('existing summary array rating',this.summaryArray[i].rating);
      
  }

  }
  else{
    this.summaryArray.push(summaryObj)

  }

  console.log('summary array',this.summaryArray);
   
  }


  get formData():FormArray{
    return this.reviewTrackerForm.get('value') as FormArray
  }

  

  getSubChildSelection(rating:any,name:any,index:number,parentIndex:number){
    console.log(index)
    console.log(parentIndex);
    
    const parentControl=this.formData.at(parentIndex).get('value') as FormArray
    const childRatingControl=parentControl.at(index).get('rating') as FormControl
    const childAchievedControl=parentControl.at(index).get('achievedRating') as FormControl
  
    console.log(childRatingControl.patchValue(0));
    if(rating.value==('Yes')){
      childRatingControl.patchValue(5)
      childAchievedControl.patchValue(null)
   
    }
    else if(rating.value==('No')){
      childRatingControl.patchValue(5)
      childAchievedControl.patchValue(null)
    }
    else if(rating.value==('NA')){
      childRatingControl.patchValue(0)
      childAchievedControl.patchValue(0)
    }

 
  }

  isSubChildReadOnly(index:number,parentIndex:number){
    const parentControl=this.formData.at(parentIndex).get('value') as FormArray
    if(parentControl){
      if(parentControl.at(index).get('options')?.value=='Yes'){
        return false
      }
      else if(parentControl.at(index).get('options')?.value=='No'){
        return false
      }
      else if(parentControl.at(index).get('options')?.value=='NA'){
        return true
      }

    }



    return true

  }



  getChildSelectedOption(rating:any,name:any,index:number){
    console.log('parent data',this.formData);

    console.log(rating.value);
    if(rating.value==('Yes')){
      this.isDisabledAchievedRating=false
      this.formData.at(index).get('rating')?.patchValue(5)
   this.formData.at(index).get('achievedRating')?.patchValue(null)
    }
    else if(rating.value==('No')){
      this.isDisabledAchievedRating=false

   this.formData.at(index).get('rating')?.patchValue(5)
   this.formData.at(index).get('achievedRating')?.patchValue(null)
    }
    else if(rating.value==('NA')){
      this.isDisabledAchievedRating=true
      this.formData.at(index).get('rating')?.patchValue(0)
       this.formData.at(index).get('achievedRating')?.patchValue(0)

    }








  }

  isChildReadOnly(index:number){
  const control=this.formData.at(index).get('achievedRating')
  if(control){
  if(this.formData.at(index).get('options')?.value=='NA'){
    return true
  }
  else if (this.formData.at(index).get('options')?.value=='Yes'){
    return false

  }
  else if (this.formData.at(index).get('options')?.value=='No'){
    return false

  }

  }

    return true
  }

  saveComments(){
    this.showSummary=true
    let rating=0
    let achievedRating=0
    for(let i=0;i<this.summaryArray.length;i++){
      rating=rating+this.summaryArray[i].rating
      achievedRating=achievedRating+this.summaryArray[i].achievedRating
    }
    // =((F67*100)/E67)/100
    let totalAchievedRating=(achievedRating*100)
    let totalRating=totalAchievedRating/rating
    let totalPercentage=totalRating
    console.log('summary percentage',totalPercentage);
    this.summaryPercentage=totalPercentage.toFixed(2)
    

  }


  getOptions(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getOptions(headers).subscribe((res:any)=>{
      this.selectOptions=res.data[0].options

    })

  }

  getSideNavData(stackId?:any,techId?:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    console.log(stackId,techId,headers);

    this.codeService.getSideNav(stackId,techId,headers).subscribe((res:any)=>{
      this.sideNavDetails=res.data[0].leftNav

    })

  }






// (Total marks obtained / Total marks possible) x 100
  //  (350/500)*100
  onGetSideSelectedValue(value?:any){
    this.reviewDetailsHeader=value.tab.textLabel
    this.getReviewDetails()

  }
  getRating(rating:any){
    console.log(rating);
  }
  name: string | undefined;
  color: string | undefined;
  openDialog(index:any): void {
    if(index){
    this.isActiveComments=!this.isActiveComments

    }
   
  }
}






