import { Component } from '@angular/core';
import {AfterViewInit, ViewChild,OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-technical-stack',
  templateUrl: './technical-stack.component.html',
  styleUrls: ['./technical-stack.component.css']
})
export class TechnicalStackComponent {


  auth_token=''
  usersList:any
  isLoaderActive:boolean=false

  constructor(private router:Router,private codeService:CodeReviewService){}


  // displayedColumns: string[] = ['firstname', 'lastname', 'contact', 'email', 'status', 'action'];
  displayedColumns: string[] = ['technologyname', 'Delete'];

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
