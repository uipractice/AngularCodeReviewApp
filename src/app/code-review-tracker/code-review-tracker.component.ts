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
  childOption=''
  auth_token=''
  isDisabledRating:boolean[]=[]
  ratingValue=5
  isDisabledAchievedRating:boolean=true
  isActiveComments:boolean=false
  disableSave:boolean=false
  


  constructor(private codeService:CodeReviewService,private formBuilder:FormBuilder, public dialog: MatDialog){}
  ngOnInit(): void {
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    console.log('auth toke in review tracker',this.auth_token);


    this.techStackdetails=JSON.parse(localStorage.getItem('techObj')||'{}')

    this.buildReactiveForm()
    this.getSideNavData(this.techStackdetails.technicalStackId,this.techStackdetails.technologiesId)

    this.getOptions()
    this.getReviewDetails()
//  this. onGetSideSelectedValue()




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
              rating:new FormControl(child.rating,Validators.required),

              achievedRating:new FormControl(child.achievedRating,[Validators.required, 
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


    //validator for range
  
  saveCheckListData(valid:any){
    console.log(valid);
    
    console.log(this.reviewTrackerForm);
    
  }

  //disable save conditionally
  // isDisableSave(index?:any,parentIndex?:any){
  //   // for(let i=0;i<this.formData.value.length;i++){
  //     if(index && parentIndex){
  //       const parentData=this.formData.at(parentIndex).get('value')as FormArray
  //       if(parentData){
  //         // for(let j=0;j<parentData.length;j++){
  //          console.log(parentData.at(index).get('key') as FormControl);
  //          if(parentData.at(index).get('options')?.valid && parentData.at(index).get('achievedRating')?.invalid ){
  //           return true
  //          }
  //          else if(parentData.at(index).get('options')?.valid && parentData.at(index).get('achievedRating')?.valid ){
  //           return false
  //         //  }
      
  //         }
  //       }
  //       else{
  //         console.log(this.formData.at(index).get('key') as FormControl);
  //         if(this.formData.at(index).get('options')?.valid && this.formData.at(index).get('achievedRating')?.invalid ){
  //           return true
  //         }
  //         else{
  //           return false
  //         }
          
  //       }
        
  //       }
      
     
  //       return false


  // }

  get formData():FormArray{
    return this.reviewTrackerForm.get('value') as FormArray
  }

  

  getSubChildSelection(rating:any,name:any,index:number,parentIndex:number){
    console.log(index)
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







  onGetSideSelectedValue(value?:any){
    this.reviewDetailsHeader=value.tab.textLabel
    this.getReviewDetails()

  }
  getRating(rating:any){
    console.log(rating);
  }
  name: string | undefined;
  color: string | undefined;
  openDialog(): void {
    this,this.isActiveComments=!this.isActiveComments
    // const dialogRef = this.dialog.open(AddCommentsComponent, {
    //   width: '695px',
    //   data: { name: this.name, color: this.color },
    // });
    // dialogRef.afterClosed().subscribe((res) => {
    //   this.color = res;
    // });
  }
}






