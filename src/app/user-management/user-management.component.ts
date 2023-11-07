import {AfterViewInit, Component, ViewChild,OnInit, Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],

})
export class UserManagementComponent implements OnInit {

  @Input() name: string | undefined;

  auth_token=''
  usersList:any
  isLoaderActive:boolean=false
  isUser:boolean=false
  status:string=''

  constructor(private router:Router,private codeService:CodeReviewService){}


  // displayedColumns: string[] = ['firstname', 'lastname', 'contact', 'email', 'status', 'action'];
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'status', 'action'];

  dataSource:any

  @ViewChild(MatPaginator) paginator: any=MatPaginator;

  ngOnInit(){
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    this.getUsersList()

  }

  getUsersList(){
    this.isLoaderActive=true
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getUSersList(headers).subscribe((res:any)=>{
      this.isLoaderActive=false
      console.log(res);
      this.usersList=res.data
      this.dataSource=this.usersList
      console.log('data source',this.dataSource.length);
      for(let i=0;i<this.dataSource.length;i++){
       if(this.dataSource[i].role=='admin'){
        this.isUser=false
       }
       else if(this.dataSource[i].role=='user'){
        this.isUser=true
       }

      }

    })
  }

  getToggle(element:any){

    if(element.role=='admin'){
      return false
    }
    else if(element.role=='user'){
      return true
    }

    return

  }

  getStatus(element:any){
    if(element.isActive==1){
      this.status='Active'
      return true
    }
    else if(element.isActive==0){
      this.status='Inactive'
      return false

    }
    return

  }

  updateRole(element:any,value:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    console.log('updated element',element);
    if(value.checked){
      console.log('user');
      let userData={
        "_id": element._id,
        "firstName": element.firstName,
        "lastName":element.lastName,
        "email": element.email,
        "isActive": element.isActive,
        "role": "user"
    }
    this.codeService.updatetUsersList(userData,headers).subscribe((res:any)=>{
      console.log(res);
      this.getUsersList()

    })
    }
    else{
      console.log('admin');

      let userData= {
        "_id": element._id,
        "firstName": element.firstName,
        "lastName":element.lastName,
        "email": element.email,
        "isActive": element.isActive,
        "role": "admin"
    }
    this.codeService.updatetUsersList(userData,headers).subscribe((res:any)=>{
      console.log(res);
      this.getUsersList()

    })

    }

  }
  updateActiveStatus(element:any,value:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    if(value.checked){
      let userData= {
        "_id": element._id,
        "firstName": element.firstName,
        "lastName":element.lastName,
        "email": element.email,
        "isActive": 1,
        "role": element.role
    }
    this.codeService.updatetUsersList(userData,headers).subscribe((res:any)=>{
      console.log(res);
      this.getUsersList()
    })
    }
    else{
      let userData= {
        "_id": element._id,
        "firstName": element.firstName,
        "lastName":element.lastName,
        "email": element.email,
        "isActive": 0,
        "role": element.role
    }
    this.codeService.updatetUsersList(userData,headers).subscribe((res:any)=>{
      console.log(res);
      this.getUsersList()

    })

    }
  }




  createUser(){
    this.router.navigate(['header/signup'])
  }


}

export interface PeriodicElement {
  firstname: string;
  lastname: string;
  contact: number;
  email: string;
  status:string;
  action:string;
}

const ELEMENT_DATA: PeriodicElement[] = []


