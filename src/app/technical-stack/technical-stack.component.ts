import { Component } from '@angular/core';
import {AfterViewInit, ViewChild,OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddCommentsComponent } from '../add-comments/add-comments.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-technical-stack',
  templateUrl: './technical-stack.component.html',
  styleUrls: ['./technical-stack.component.css']
})
export class TechnicalStackComponent {


  auth_token=''
  usersList:any
  technologiesForm:any=FormGroup
  isLoaderActive:boolean=false

  constructor(private router:Router,private codeService:CodeReviewService,private fb:FormBuilder,private dialog:MatDialog){}


  // displayedColumns: string[] = ['firstname', 'lastname', 'contact', 'email', 'status', 'action'];
  displayedColumns: string[] = ['technologyname', 'Delete'];

  dataSource:any

  @ViewChild(MatPaginator) paginator: any=MatPaginator;

  ngOnInit(){
    this.technologiesForm=this.fb.group({
      'name':new FormControl('',Validators.required)
    })
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')
    this.getTechnologyList()

  }

  getTechnologyList(){

    this.isLoaderActive=true
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getTechnologyDetails(headers).subscribe((res:any)=>{
      this.isLoaderActive=false
      console.log(res);
      this.usersList=res.data
      this.dataSource=this.usersList

    })
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  addTechnology(){
    console.log(this.technologiesForm.get('name').value);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    let tech=
    {
      
      "name": this.technologiesForm.get('name').value,
      "isSonar":false
  }
    this.codeService.addTechnologyDetails(headers,tech).subscribe((res:any)=>{
      console.log(res);
      this.getTechnologyList()

    })


  }

  onDeleteTechnology(element){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    console.log('delete tech',element._id);
    const dialogRef= this.dialog.open(AddCommentsComponent,{
      data: {
        popupHeaderTitle: 'Do you really want to delete?',
        popupOkBtn: 'Delete',
        popupCancelBtn: 'Cancel',
        popupDeleteBool: true
      }})
    dialogRef.afterClosed().subscribe((res:any)=>{
      if(res.value=='Yes'){
        this.codeService.deleteTechnologies(headers,element._id).subscribe((res:any)=>{
          console.log(res);
          this.getTechnologyList()
        })
      }
      else if(res.value=='No'){
        console.log('Cancelled deletion');
        
      }
      
    })
    

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
