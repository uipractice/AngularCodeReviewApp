import { Component,ElementRef,OnInit,ViewChild } from '@angular/core';
import { CodeReviewService } from '../code-review.service';
import { Form, FormArray, FormBuilder, FormControl, FormGroup,  } from '@angular/forms';
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

  selectedOption = 'selected';



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
  dialogRef: any;
  isDisabledRating:boolean[]=[]
  ratingValue=5
  isDisabledAchievedRating:boolean=true


  constructor(private codeService:CodeReviewService,private formBuilder:FormBuilder, public dialog: MatDialog){}
  ngOnInit(): void {
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    console.log('auth toke in review tracker',this.auth_token);


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
              options:this.subChildOptions,
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
            for(let subChild of child.value ){
            const checkListsubChildGroup=new FormGroup({
              key:new FormControl(subChild.key),
              options:new FormControl(subChild.options),
              rating:new FormControl(subChild.rating),
              achievedRating:new FormControl(subChild.achievedRating),
              comments:new FormControl(subChild.comments)
            })


            checkListsubChildGroupData.push(checkListsubChildGroup)
           }
            checkListChildGroupData.push(checkListChildGroup)

          }
        }
        checkListGroupData.push(checkListGroup)



      })
    }


















  saveCheckListData(){
    console.log(this.reviewTrackerForm.value);

  }

  get formData():FormArray{
    return this.reviewTrackerForm.get('value') as FormArray
  }



  getSubChildSelection(rating:any,name:any,index:number,parentIndex:number){
    console.log('parent',parentIndex);
    
    console.log('child',index);
    let control=this.formData.at(parentIndex).value.value as FormArray
   let subControl=control.at(index) 
   console.log('sub child',subControl);

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

    return false
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

  name: string | undefined;
  color: string | undefined;
  openDialog(): void {
    const dialogRef = this.dialog.open(AddCommentsComponent, {
      width: '695px',
      data: { name: this.name, color: this.color },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.color = res;
    });
  }
}






