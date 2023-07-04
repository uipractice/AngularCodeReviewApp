import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
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
  constructor(private router:Router,private http:HttpClient,private codeService:CodeReviewService, private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    
    
    if(this.activatedRoute.snapshot.params['id']){
      console.log('id',this.activatedRoute.snapshot.params['id']);
      
      
     this.id=this.activatedRoute.snapshot.params['id']
      // console.log('details ID',detailsId);
      
      console.log('status:',this.activatedRoute.snapshot.params['status']);
      this.status=this.activatedRoute.snapshot.params['status']
      
    this.codeService.getSelectedReviewDetails(this.id).subscribe((res:any)=>{
      if(res.success==true){
        console.log(res.data);
        this.stack=res.data[0].technical_stack.name
        this.technology=res.data[0].technologies.name
        const {account,project,storyId,developers,projectLead,reviewPackagesandFiles,reviewersName,codeReviewComments}=res.data[0]
      
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
  this.router.navigate(['/startCodeReviewTracker'])
}


getTechnicalStackDetails(){
  return this.codeService.getTechnicalStackDetails().subscribe((res:any)=>{
    console.log(res);
    
    if(res.success==true){
      this.technicalStackList=res.data
    }
    console.log('technical stack list',this.technicalStackList);
    
  })
}
onSelectStack(value:any){
  console.log('selected stack',value);
  this.technicalStackId=value._id 
 
  this.codeService.getTechnologyDetails(value._id).subscribe((res:any)=>{
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
    this.codeService.onEditDetails(data).subscribe((res:any)=>{
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
    this.codeService.postReviewDetails(data).subscribe((res:any)=>{
        console.log(res);
        console.log(JSON.stringify(this.codeReviewerForm.value));
      this.router.navigate(['/startCodeReviewTracker'])
        
    })
    
  }
  

  
  
  
  
  
}

submitReviewDetails(){
  if(this.status=='pending'){
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
    this.codeService.postReviewDetails(data).subscribe((res:any)=>{
        console.log(res);
        console.log(JSON.stringify(this.codeReviewerForm.value));
      this.router.navigate(['/codeReviewTracker'])
        
    })
  } 
  else if(this.status=='completed'){
    this.router.navigate(['/codeReviewTracker'])


  }

}

}
