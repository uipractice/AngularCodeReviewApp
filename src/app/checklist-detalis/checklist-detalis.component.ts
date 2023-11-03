import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentsComponent } from '../add-comments/add-comments.component';
import { ModalData } from '../add-comments/add-comments.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeReviewService } from '../code-review.service';
import { HttpHeaders } from '@angular/common/http';
import { Obj } from '@popperjs/core';

@Component({
  selector: 'app-checklist-detalis',
  templateUrl: './checklist-detalis.component.html',
  styleUrls: ['./checklist-detalis.component.css']
})

export class ChecklistDetailsComponent implements OnInit {
  checklistHeading: string = '';
  deleteValue: any
  auth_token:any
  addMainQuestion: any
  addSubQuestion: any
  technologyId:any
  technologyName:any
  sideNavData:any
  sideNavHeading:any
  checkListData:any
  checklistQuestions:any=[] //data array

  constructor(private codeService:CodeReviewService, private dialog: MatDialog,private router:Router,private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void { 
    this.auth_token=JSON.parse(localStorage.getItem('auth_token')||'{}')

    this.activatedRouter.paramMap.subscribe((res:any)=>{
      this.technologyId=res.params.id,
      this.technologyName=res.params.techname
    })
    this.getSideNavData()
    this.checkListData={
      "technologiesId":this.technologyId,
      "data":this.checklistHeading
    }
    this.checklistQuestions.push(this.checkListData)
    console.log('checklistData',this.checklistQuestions);
    
  }
  getSideNavData(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getSideNav(this.technologyId,headers).subscribe((res:any)=>{
      this.sideNavData=res.data[0].leftNav
      console.log('sidenav List', this.sideNavData);
      
    })

  }
  onSelectSideNav(heading:any){
    console.log('heading',heading);
    this.sideNavHeading=heading
    

  }
  addSideNavData(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    let checklistHeadingJson={
      "leftNav" : [this.checklistHeading],
      "technologiesId": this.technologyId
    }
    console.log('checklist heading',checklistHeadingJson);
    this.codeService.postSideNav(checklistHeadingJson,headers).subscribe((res:any)=>{
      if(res.success==true){
        console.log(res); 
        this.getSideNavData()

      }
      
    })
  }

  deletePopup() {
    const sampleData: ModalData = {
      popupHeaderTitle: 'Do you really want to delete?',
      popupOkBtn: 'Delete',
      popupCancelBtn: 'Cancel',
      popupDeleteBool: true
    }
    const dialogRef = this.dialog.open(AddCommentsComponent, {
      data: sampleData
    })
    dialogRef.afterClosed().subscribe((val: any) => {
      this.deleteValue = val.value
      console.log(this.deleteValue);
      if (this.deleteValue == 'Yes') {
        console.log('Val deleted');
      }
      else if (this.deleteValue == 'No') {
        console.log('Cancelled deletion');
      }
    })
  }

  addMainQuestionPopup() {
    const sampleData: ModalData = {
      popupHeaderTitle: 'Add Main Question',
      popupOkBtn: 'Add',
      popupCancelBtn: 'Cancel',
      popupAddMainQuestionBool: true
    }
    const dialogRef = this.dialog.open(AddCommentsComponent, {
      data: sampleData
    })
    dialogRef.afterClosed().subscribe((val: any) => {
      this.addMainQuestion = val.value
      console.log(this.addMainQuestion);
      if (this.addMainQuestion == 'Yes') {
        console.log('Main Question added');
      }
      else if (this.addMainQuestion == 'No') {
        console.log('Cancelled main question addition');
      }
    })
  }

  addSubQuestionPopup() {
    const sampleData: ModalData = {
      popupHeaderTitle: 'Add Sub Question',
      popupOkBtn: 'Add',
      popupCancelBtn: 'Cancel',
      popupAddSubQuestionBool: true
    }
    const dialogRef = this.dialog.open(AddCommentsComponent, {
      data: sampleData
    })
    dialogRef.afterClosed().subscribe((val: any) => {
      this.addSubQuestion = val.value
      console.log(this.addSubQuestion);
      if (this.addSubQuestion == 'Yes') {
        console.log('Sub question added');
      }
      else if (this.addSubQuestion == 'No') {
        console.log('Cancelled sub question addition');
      }
    })
  }

}
