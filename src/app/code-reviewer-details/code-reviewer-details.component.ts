import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component,OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';


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
  userDetails:any
  codeReviewerForm:any


  constructor(private router:Router,private http:HttpClient,private codeService:CodeReviewService, private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    this.userDetails=JSON.parse(localStorage.getItem('user Details')||'{}')
    console.log('userdetails',this.userDetails);
    this.getTechnology()
    this.createDetailsForm()
  }

  createDetailsForm(){
    this.codeReviewerForm=new FormGroup({
      account:new FormControl('',Validators.required),
      project:new FormControl('',Validators.required),
      technology:new FormControl('',Validators.required),
      storyId:new FormControl(''),
      developers:new FormControl('',Validators.required),
      projectLead:new FormControl('',Validators.required),
      reviewPackagesandFiles:new FormControl(''),
      reviewersName:new FormControl(this.userDetails.firstName,Validators.required),
      codeReviewComments:new FormControl('')
    })
  }


getBackDetails(){
  this.router.navigate(['header/user/startCodeReviewTracker'])
}
onNavigateDashboard(){
  this.router.navigate(['header/startCodeReviewTracker'])
}
getTechnology(){
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.auth_token}`
  });
  this.codeService.getTechnologyDetails(headers).subscribe((res:any)=>{
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
}

submitReviewDetails(){
    let data={
      "account": this.codeReviewerForm.get('account')?.value,
      "project": this.codeReviewerForm.get('project')?.value,
      "storyId": this.codeReviewerForm.get('storyId')?.value,
      "developers":this.codeReviewerForm.get('developers')?.value,
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
      this.router.navigate(['header/user/startCodeReviewTracker'])

    })
 

}


}
