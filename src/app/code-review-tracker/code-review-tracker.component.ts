import { Component,ElementRef,OnInit,ViewChild } from '@angular/core';
import { CodeReviewService } from '../code-review.service';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, ValidationErrors, Validators,  } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-code-review-tracker',
  templateUrl: './code-review-tracker.component.html',
  styleUrls: ['./code-review-tracker.component.css'],
})
export class CodeReviewTrackerComponent implements OnInit {
  detailsId:any
  selectOptions:any
  reviewDetailsHeader='Functional'
  selectelTabCheckList:any
  sideNavDetails:any
  reviewTrackerForm:any=FormGroup
  auth_token=''
  isDisableSubmit:boolean=false
  isActiveChildCOmments:boolean[]=[false]
  isActiveComments:boolean[]=[false,false]
  // isActiveComments:boolean[]=[false]

  disableSave:boolean=false
  showSummary:boolean=false
  summaryArray:any[]=[]
  summaryPercentage:any
  status:any
  projectDetails:any  
  completedStatusValue:boolean=false
  commentsData:any
  ratingValue:boolean=false
  achievedRatingValue:boolean=false
  isLoaderActive:boolean=false


  constructor(private codeService:CodeReviewService,private formBuilder:FormBuilder, public dialog: MatDialog,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
   


    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    this.projectDetails=JSON.parse(localStorage.getItem('projectDetails')||'{}')
    this.activatedRoute.paramMap.subscribe((res:any)=>{
      this.status=res.params['status']
      this.detailsId=res.params['id']
      console.log(this.status,this.detailsId)     
    })
    this.buildReactiveForm()
    this.getSideNavData(this.projectDetails.technicalStackId,this.projectDetails.technologiesId)

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
      this.isLoaderActive=true

    this.buildReactiveForm()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getReviewTrackerDetails(headers,this.projectDetails.technicalStackId,this.projectDetails.technologiesId, this.reviewDetailsHeader).subscribe((res:any)=>{
       
      if(res.success==true){
      this.isLoaderActive=false
  console.log('loader status',this.isLoaderActive);

      console.log(res.data[0].data[0].value);
      this.selectelTabCheckList=res.data[0].data[0]
      this.getCheckListQuestions()
      
     }
    })

    // this.codeService.getSavedCheckListData(headers,this.detailsId,this.reviewDetailsHeader).subscribe((res:any)=>{
    //   console.log('saved data',res.data);
    //   if(res.success==true){
    //     if(res.data.length==0){
    //       console.log('No saved data');
       
          
    //     }
    //     else{
    //       this.isLoaderActive=false
    //       console.log('loader status',this.isLoaderActive);
      
    //           console.log(res.data[0].data[0].value);
    //           this.selectelTabCheckList=res.data[0].data[0]
    //           this.getCheckListQuestions()

    //     }
    //   }     
    // })

     
    }

    getCheckListQuestions(){
      const checkListChildGroupData=this.reviewTrackerForm.get('value') as FormArray
      for(let child of this.selectelTabCheckList.value){
        if(child.options=='' && child.rating=='' && child.achievedRating=='' && child.comments==''){
          const checkListChildGroup=new FormGroup({
            key:new FormControl(child.key),
            options:new FormControl(child.options),
            rating:new FormControl(child.rating),
            achievedRating:new FormControl(child.achievedRating),
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
            key:new FormControl(subChild.key),
            options:new FormControl(subChild.options),
            rating:new FormControl(subChild.rating),

            achievedRating:new FormControl(subChild.achievedRating),
            comments:new FormControl(subChild.comments )
          })


          checkListsubChildGroupData.push(checkListsubChildGroup)
         }
          checkListChildGroupData.push(checkListChildGroup)

        }
      }
    }
   

    onvalue(number:any){
      const control=this.formData.at(number).get('achievedRating')?.value
      if(control<=5 && control!=null){
        this.isDisableSubmit=false
      }
      else{
        this.isDisableSubmit=true
      }
      

    }
   

  
  
  saveCheckListData(valid:any){
    console.log('status',valid);
    
    console.log(this.reviewTrackerForm);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
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
  let saveJson={
    "data":[this.reviewTrackerForm.value],
    "detailsId":this.detailsId
  }

  this.codeService.saveCheckListData(saveJson,headers).subscribe((res:any)=>{
    console.log('submitted',res);
    
  })
 
  
   
  }

  getStatusValue(value:any){
    console.log('checkbox value',value.target.checked);
    this.completedStatusValue=value.target.checked  
  }
  submitReport(){
    if(this.completedStatusValue){
      let data={
        "_id": this.projectDetails._id,
        "account": this.projectDetails.account,
        "project": this.projectDetails.project,
        "storyId": this.projectDetails.storyId,
        "developers": this.projectDetails.developers,
        "projectLead":this.projectDetails.projectLead,
        "reviewPackagesandFiles":this.projectDetails.reviewPackagesandFiles,
        "reviewersName": this.projectDetails.reviewersName,
        "codeReviewComments": this.projectDetails.codeReviewComments,
        "status": "completed",
        "technologiesId":this.projectDetails.technologiesId
    }
   
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.updateReviewDetails(data,headers).subscribe((res:any)=>{
      console.log('updated review details',res);
    })
    } else{
      let data={
        "_id": this.projectDetails._id,
        "account": this.projectDetails.account,
        "project": this.projectDetails.project,
        "storyId": this.projectDetails.storyId,
        "developers": this.projectDetails.developers,
        "projectLead":this.projectDetails.projectLead,
        "reviewPackagesandFiles":this.projectDetails.reviewPackagesandFiles,
        "reviewersName": this.projectDetails.reviewersName,
        "codeReviewComments": this.projectDetails.codeReviewComments,
        "status": "submitted",
        "technologiesId":this.projectDetails.technologiesId
    }
   
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.updateReviewDetails(data,headers).subscribe((res:any)=>{
      console.log('updated review details',res);
    })
    }
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
      childRatingControl.setValidators([Validators.required])
      childAchievedControl.setValidators([Validators.required, 
      //    Validators.min(0),
      //  Validators.max(5),
      this.validateNumberRange,
      Validators.pattern('^[0-5]$')
    ])
      childRatingControl.patchValue(5)
      childAchievedControl.patchValue(null)
   
    }
    else if(rating.value==('No')){
      childRatingControl.setValidators([Validators.required])
      childAchievedControl.setValidators([Validators.required, 
        //    Validators.min(0),
      //  Validators.max(5),
      this.validateNumberRange,
      Validators.pattern('^[0-5]$')
    ])
      childRatingControl.patchValue(5)
      childAchievedControl.patchValue(null)
    }
    else if(rating.value==('NA')){
      childRatingControl.setValidators([Validators.required])
      childAchievedControl.setValidators([Validators.required, 
      //    Validators.min(0),
      //  Validators.max(5),
      this.validateNumberRange,
      Validators.pattern('^[0-5]$')
    ])
      childRatingControl.patchValue(0)
      childAchievedControl.patchValue(0)
    }
    else{
      childRatingControl.clearValidators()
      childAchievedControl.clearValidators()
    }

 
  }

  validateNumberRange(control: AbstractControl) {
    const inputValue = control.value;
    
    if (inputValue === '' || (inputValue >= 0 && inputValue <= 5)) {
      return null; // Valid input
    } else {
      control.setValue(''); // Clear the input field
      return { invalidNumber: true };
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
    if(this.formData.at(index).get('options')?.value==('Yes'||'No'||'NA') && this.formData.at(index).get('achievedRating')?.value=='' ){
      this.isDisableSubmit=true
    }
    else{
      this.isDisableSubmit=false
    }
   
    // if(rating.value==('Yes'||'No'||'NA')  ){
      if(this.formData.at(index).get('rating')?.valid && this.formData.at(index).get('achievedRating')?.valid){
        this.ratingValue=false
        this.achievedRatingValue=false
      }
      else{
        this.ratingValue=true
        this.achievedRatingValue=true
      }

      // }
    
    console.log('rating',rating);
    
    console.log('parent data',this.formData);
    this.formData.at(index).get('rating')?.valid


    console.log(rating.value);
    if(rating.value==('Yes')){
      // this.isDisabledAchievedRating=false
      this.formData.at(index).get('rating')?.setValidators([Validators.required])
      this.formData.at(index).get('achievedRating')?.setValidators([Validators.required, 
        // Validators.pattern(/^(?:[0-5])$/)
          //    Validators.min(0),
      //  Validators.max(5),
      this.validateNumberRange,
      Validators.pattern('^[0-5]$')
      ]
        )
       this.formData.at(index).get('rating')?.markAsDirty()
       this.formData.at(index).get('rating')?.updateValueAndValidity()
      this.formData.at(index).get('rating')?.patchValue(5)
      this.formData.at(index).get('achievedRating')?.patchValue(null)
     



    }
    else if(rating.value==('No')){
      // this.isDisabledAchievedRating=false
      this.formData.at(index).get('rating')?.setValidators([Validators.required])
      this.formData.at(index).get('achievedRating')?.setValidators([Validators.required, 
        // Validators.pattern(/^(?:[0-5])$/)
          //    Validators.min(0),
      //  Validators.max(5),
      this.validateNumberRange,
      Validators.pattern('^[0-5]$')]
        )
       this.formData.at(index).get('rating')?.markAsDirty()
       this.formData.at(index).get('rating')?.updateValueAndValidity()

   this.formData.at(index).get('rating')?.patchValue(5)
   this.formData.at(index).get('achievedRating')?.patchValue(null)
   this.formData.at(index).get('rating')?.setValidators([Validators.required])
   this.formData.at(index).get('achievedRating')?.setValidators([Validators.required, 
 // Validators.pattern(/^(?:[0-5])$/)
          //    Validators.min(0),
      //  Validators.max(5),
      this.validateNumberRange,
      Validators.pattern(/^\d*\.?\d*$/)    ])
     this.formData.at(index).get('rating')?.markAsDirty()
     this.formData.at(index).get('rating')?.updateValueAndValidity()

    }
    else if(rating.value==('NA')){
      // this.isDisabledAchievedRating=true
      this.formData.at(index).get('rating')?.setValidators([Validators.required])
      this.formData.at(index).get('achievedRating')?.setValidators([Validators.required, 
 // Validators.pattern(/^(?:[0-5])$/)
          //    Validators.min(0),
      //  Validators.max(5),
      this.validateNumberRange,
      Validators.pattern('^[0-5]$')      ])
       this.formData.at(index).get('rating')?.markAsDirty()
       this.formData.at(index).get('rating')?.updateValueAndValidity()
      this.formData.at(index).get('rating')?.patchValue(0)
       this.formData.at(index).get('achievedRating')?.patchValue(0)
       this.formData.at(index).get('rating')?.setValidators([Validators.required])
       this.formData.at(index).get('achievedRating')?.setValidators([Validators.required, 
         Validators.pattern('^[0-5]$')])
         this.formData.at(index).get('rating')?.markAsDirty()
         this.formData.at(index).get('rating')?.updateValueAndValidity()
  
    }
    else{
      this.formData.at(index).get('rating')?.clearValidators()
      this.formData.at(index).get('achievedRating')?.clearValidators()
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
    console.log('project details',this.projectDetails);
    
    let data={
      "_id": this.projectDetails._id,
      "account": this.projectDetails.account,
      "project": this.projectDetails.project,
      "storyId": this.projectDetails.storyId,
      "developers": this.projectDetails.developers,
      "projectLead":this.projectDetails.projectLead,
      "reviewPackagesandFiles":this.projectDetails.reviewPackagesandFiles,
      "reviewersName": this.projectDetails.reviewersName,
      "codeReviewComments": this.projectDetails.codeReviewComments,
      "status": "submitted",
      "technologiesId":this.projectDetails.technologiesId
  }
  console.log('data',data);
  console.log('tech Id', this.projectDetails.technologiesId);
  
  
   
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.auth_token}`
  });
  this.codeService.updateReviewDetails(data,headers).subscribe((res:any)=>{
    console.log('updated review details',res);
    
  })

    
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

 

  openChildComments(i:number){
      this.isActiveChildCOmments[i]=!this.isActiveChildCOmments[i]
    console.log('child boolean value',this.isActiveChildCOmments);
    

  }
  openSubChildComments(j:number,i:number){

    console.log([i,j]);
    
    const parentControl=this.formData.at(i).get('value') as FormArray
    const commentsControl=parentControl.at(j).get('comments') as FormControl
    if(commentsControl){
      console.log('isactive comments',[[i][j]]);
      
    
        this.isActiveComments[[i][j]]=!this.isActiveComments[[i][j]]
        // this.isActiveComments[j]=!this.isActiveComments[j]

        console.log('after clicked',this.isActiveComments[[i][j]]);
        

    



    }
   
     

   
    
  }






// (Total marks obtained / Total marks possible) x 100
  //  (350/500)*100
  onGetSideSelectedValue(value?:any){
   this.isActiveChildCOmments=[false]
   console.log('child comments',this.isActiveChildCOmments);
   
    // this.isDisableSubmit=false
    this.reviewDetailsHeader=value.tab.textLabel
    this.getReviewDetails()
    

  }
  
  
}






