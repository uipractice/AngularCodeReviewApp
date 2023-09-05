import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component,OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-code-reviewer-details',
  templateUrl: './code-reviewer-details.component.html',
  styleUrls: ['./code-reviewer-details.component.css']
})
export class CodeReviewerDetailsComponent implements OnInit {
  id:any
  stack:any
  technology:any
  editTechnicalStack:any
  editTechnology:any
  status:any=''
  technicalStackList:any
  technologyList:any
  technicalStackId:any
  technologiesId:any
  auth_token=''

  constructor(private router:Router,private http:HttpClient,private codeService:CodeReviewService, private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')

    if(this.activatedRoute.snapshot.params['id']){
      console.log('id',this.activatedRoute.snapshot.params['id']);


     this.id=this.activatedRoute.snapshot.params['id']
      // console.log('details ID',detailsId);

      console.log('status:',this.activatedRoute.snapshot.params['status']);
      this.status=this.activatedRoute.snapshot.params['status']
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.auth_token}`
      });
  

    this.codeService.getSelectedReviewDetails(this.id,headers).subscribe((res:any)=>{
      if(res.success==true){
        console.log(res.data);
        this.stack=res.data[0].technical_stack.name
        this.technology=res.data[0].technologies.name

        let data={
          account:res.data[0].account,
          project:res.data[0].project,
          technicalStack:res.data[0].technical_stack.name,
          technology:res.data[0].technologies.name,
          storyId:res.data[0].storyId,
          developers:res.data[0].developers,
          projectLead:res.data[0].projectLead,
          reviewPackagesandFiles:res.data[0].reviewPackagesandFiles,
          reviewersName:res.data[0].reviewersName,
          codeReviewComments:res.data[0].codeReviewComments
        }
        console.log('data',data);


        this.codeReviewerForm.setValue(data)
        this.codeReviewerForm.controls['technicalStack'].setValue(res.data[0].technical_stack.name)
        this.codeReviewerForm.controls['technology'].setValue(res.data[0].technologies.name)


      }

    })
    }
    this.getTechnicalStackDetails()







  }
codeReviewerForm=new FormGroup({
  account:new FormControl('',Validators.required),
  project:new FormControl('',Validators.required),
  technicalStack:new FormControl(null),
  technology:new FormControl('',Validators.required),
  storyId:new FormControl('',Validators.required),
  developers:new FormControl('',Validators.required),
  projectLead:new FormControl('',Validators.required),
  reviewPackagesandFiles:new FormControl('',Validators.required),
  reviewersName:new FormControl('',Validators.required),
  codeReviewComments:new FormControl('',Validators.required)
})

getBackDetails(){
  this.router.navigate(['/codeReviewTracker'])
}


getTechnicalStackDetails(){
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.auth_token}`
  });
  return this.codeService.getTechnicalStackDetails(headers).subscribe((res:any)=>{
    console.log(res);

    if(res.success==true){
      this.technicalStackList=res.data
    }
    console.log('technical stack list',this.technicalStackList);

  })
}
onSelectStack(value:any){
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.auth_token}`
  });
  console.log('selected stack',value);
  this.technicalStackId=value._id


  this.codeService.getTechnologyDetails(value._id,headers).subscribe((res:any)=>{
    if(res.success==true){
      console.log(res);

      this.technologyList=res.data
    }

  })


}

onSelectTechnology(value:any){
console.log('value',value);
console.log(value);

this.technologiesId=value._id
console.log(this.technologiesId);
var techObj={
  "technologiesId":value._id,
  "technicalStackId":value.technicalStackId
}
console.log(techObj);
localStorage.setItem('techObj',JSON.stringify(techObj))
}


save(){

  if(this.status=='pending'){
    let data={
      "_id":this.id,
      "account": this.codeReviewerForm.get('account')?.value,
      "project": this.codeReviewerForm.get('project')?.value,
      "storyId": this.codeReviewerForm.get('storyId')?.value,
      "developers":this.codeReviewerForm.get('developers')?.value,
      "technicalStackId":this.technicalStackId,
      "technologiesId":this.technologiesId,
      "projectLead":this.codeReviewerForm.get('projectLead')?.value,
      "reviewPackagesandFiles":this.codeReviewerForm.get('reviewPackagesandFiles')?.value,
      "reviewersName": this.codeReviewerForm.get('reviewersName')?.value,
      "codeReviewComments":  this.codeReviewerForm.get('codeReviewComments')?.value,
      "status":"pending"
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.onEditDetails(data,headers).subscribe((res:any)=>{
      if(res.success==true){
        console.log(res)
        this.router.navigate(['/startCodeReviewTracker'])
      }
    })

  }
  else{
    let data={
      "account": this.codeReviewerForm.get('account')?.value,
      "project": this.codeReviewerForm.get('project')?.value,
      "storyId": this.codeReviewerForm.get('storyId')?.value,
      "developers":this.codeReviewerForm.get('developers')?.value,
      "technicalStackId":this.technicalStackId,
      "technologiesId":this.technologiesId,
      "projectLead":this.codeReviewerForm.get('projectLead')?.value,
      "reviewPackagesandFiles":this.codeReviewerForm.get('reviewPackagesandFiles')?.value,
      "reviewersName": this.codeReviewerForm.get('reviewersName')?.value,
      "codeReviewComments":  this.codeReviewerForm.get('codeReviewComments')?.value,
      "status":"pending"
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.postReviewDetails(data,headers).subscribe((res:any)=>{
        console.log(res);
        console.log(JSON.stringify(this.codeReviewerForm.value));
      this.router.navigate(['/startCodeReviewTracker'])

    })

  }







}

submitReviewDetails(){
  console.log('submit');
  
    let data={
      "account": this.codeReviewerForm.get('account')?.value,
      "project": this.codeReviewerForm.get('project')?.value,
      "storyId": this.codeReviewerForm.get('storyId')?.value,
      "developers":this.codeReviewerForm.get('developers')?.value,
      "technicalStackId":this.technicalStackId,
      "technologiesId":this.technologiesId,
      "projectLead":this.codeReviewerForm.get('projectLead')?.value,
      "reviewPackagesandFiles":this.codeReviewerForm.get('reviewPackagesandFiles')?.value,
      "reviewersName": this.codeReviewerForm.get('reviewersName')?.value,
      "codeReviewComments":  this.codeReviewerForm.get('codeReviewComments')?.value,
      "status":"completed"
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.postReviewDetails(data,headers).subscribe((res:any)=>{
        console.log(res);
        console.log(JSON.stringify(this.codeReviewerForm.value));
      this.router.navigate(['/codeReviewTracker'])

    })
  // }
 

}


@ViewChild('select')
select!: MatSelect;

allSelected=false;
 foods: any[] = [
  {value: 'steak-0', viewValue: 'Steak'},
  {value: 'pizza-1', viewValue: 'Pizza'},
  {value: 'tacos-2', viewValue: 'Tacos'}
];
toggleAllSelection() {
  if (this.allSelected) {
    this.select.options.forEach((item: MatOption) => item.select());
  } else {
    this.select.options.forEach((item: MatOption) => item.deselect());
  }
}
 optionClick() {
  let newStatus = true;
  this.select.options.forEach((item: MatOption) => {
    if (!item.selected) {
      newStatus = false;
    }
  });
  this.allSelected = newStatus;
}




}
