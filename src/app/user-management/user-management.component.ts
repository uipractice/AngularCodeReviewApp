import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
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
  auth_token=''
  usersList:any

  constructor(private router:Router,private codeService:CodeReviewService){}


  // displayedColumns: string[] = ['firstname', 'lastname', 'contact', 'email', 'status', 'action'];
  displayedColumns: string[] = ['firstname', 'lastname',  'email','action'];

  dataSource:any

  @ViewChild(MatPaginator) paginator: any=MatPaginator;

  ngOnInit(){
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getUSersList(headers).subscribe((res:any)=>{
      console.log(res);
      this.usersList=res.data
      this.dataSource=this.usersList
      
    })




  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  createUser(){
    this.router.navigate(['/signup'])
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


