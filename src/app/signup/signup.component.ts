import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  public signupForm !: FormGroup;
  formBuilder: any;
  router: any;
  constructor(private FormBuilder : FormBuilder, private http : HttpClient) {  }

  ngOnInit(): void {
    this.signupForm.controls = this.formBuilder.group ({
      firstName:[''],
      lastName:[''],
      email:[''],
      password:[''],
      role:['']

    })

  }
signUp(){
  this.http.post<any>("https://cg3zhj7w4a.execute-api.ap-south-1.amazonaws.com/default/api/users", this.signupForm)
  .subscribe(res=>{
    alert("signup Successfull");

    this.signupForm.reset();
    this.router.navigate(['login']);
  },err=>{
    alert ("alert went wrong ")
  })


  }

}


