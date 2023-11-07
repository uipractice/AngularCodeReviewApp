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
  auth_token: any
  addMainQuestion: any
  addSubQuestion: any
  technologyId:any
  technologyName:any
  sideNavData:any
  sideNavHeading:any
  leftNavId:any
  checkListData:any
  checklistQuestions:any=[]
  marginTop: any = '2%';

  constructor(private codeService: CodeReviewService, private dialog: MatDialog, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('sidenavdata',this.sideNavData);
    
    this.auth_token = JSON.parse(localStorage.getItem('auth_token') || '{}')

    this.activatedRouter.paramMap.subscribe((res: any) => {
      this.technologyId = res.params.id,
        this.technologyName = res.params.techname
    })
    this.getSideNavData()
    this.checkListData = {
      "technologiesId": this.technologyId,
      "data": this.checklistHeading
    }
    this.checklistQuestions.push(this.checkListData)
    console.log('checklistData', this.checklistQuestions);
  }

  getSideNavData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.codeService.getSideNav(this.technologyId, headers).subscribe((res: any) => {
      if(res.success==true && res.data){
        this.sideNavData = res.data[0].leftNav
      this.leftNavId= res.data[0]._id
      console.log('sidenav List', res);
      }
     
      
    })
    
  }

  onSelectSideNav(heading: any) {
    console.log('heading', heading);
    this.sideNavHeading = heading;
    this.marginTop = '0%';
  }

  test() {
    const listItems = document.querySelectorAll("#checklistHeadingList li");
    // Add a click event listener to each <li> to toggle the "selected" class
    listItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Remove the "selected" class from all <li> elements
        listItems.forEach((li) => li.classList.remove("selected"));
        // Add the "selected" class to the clicked <li> element
        item.classList.add("selected");
      });
    });
  }

  addSideNavData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth_token}`
    });
    let checklistHeadingJson = {
      "leftNav": [this.checklistHeading],
      "technologiesId": this.technologyId
    }
    let updatetHeadingJson = {
      "leftNav": this.checklistHeading,
      "leftNavId": this.leftNavId
    }
    if(this.sideNavData){
      this.codeService.updateSideNav(updatetHeadingJson, headers).subscribe((res:any)=>{
        if(res.success == true ){
          this.getSideNavData()
        }
      })
    }
    else{
      this.codeService.postSideNav(checklistHeadingJson, headers).subscribe((res:any)=>{
        if(res.success == true ){
          this.getSideNavData()
        }
      })

    }
   
   
  }

  deletePopup(sideNavHeading?:any) {
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
      console.log(val)
      this.deleteValue = val.value
      console.log(this.deleteValue);
      if (this.deleteValue == 'Yes') {
        console.log('Val deleted');
      }
      else {
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
      console.log(val)
      this.addMainQuestion = val.value
      console.log(this.addMainQuestion);
      if (this.addMainQuestion) {
        console.log('Main Question added');
      }
      else {
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
      if (this.addSubQuestion) {
        console.log('Sub question added');
      }
      else {
        console.log('Cancelled sub question addition');
      }
    })
  }

}
