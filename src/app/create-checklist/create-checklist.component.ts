import { Component,OnInit } from '@angular/core';
import { CodeReviewService } from '../code-review.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-create-checklist',
  templateUrl: './create-checklist.component.html',
  styleUrls: ['./create-checklist.component.css']
})
export class CreateChecklistComponent implements OnInit {
  checked = false;
  Sonarqube = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  auth_token:any
  technologies:any
  technologyForm:any=FormGroup
  constructor(private codeService:CodeReviewService,private fb:FormBuilder,private router:Router){}

  ngOnInit(){
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    this.getTechnology()
    this.technologyForm=this.fb.group({
      technology:new FormControl('',Validators.required)
    })
  }

  getTechnology(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });

    this.codeService.getTechnologyDetails(headers).subscribe((res:any)=>{
      console.log(res);
      this.technologies=res.data
      
    })
  }
  cancelTechCreation(){
    this.router.navigate(['/header/user-management'])
  }
}
