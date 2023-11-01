import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentsComponent } from '../add-comments/add-comments.component';

@Component({
  selector: 'app-checklist-detalis',
  templateUrl: './checklist-detalis.component.html',
  styleUrls: ['./checklist-detalis.component.css']
})

export class ChecklistDetailsComponent implements OnInit {
  checklistHeading: string = '';
  deleteValue: any
  addMainQuestion: any
  addSubQuestion: any

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  deletePopup() {
    const dialogRef = this.dialog.open(AddCommentsComponent, {
      data: {
        popupHeaderTitle: 'Do you really want to delete?',
        popupOkBtn: 'Delete',
        popupCancelBtn: 'Cancel',
        popupDeleteBool: true
      },
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
    const dialogRef = this.dialog.open(AddCommentsComponent, {
      data: {
        popupHeaderTitle: 'Add Main Question',
        popupOkBtn: 'Add',
        popupCancelBtn: 'Cancel',
        popupAddMainQuestionBool: true
      },
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
    const dialogRef = this.dialog.open(AddCommentsComponent, {
      data: {
        popupHeaderTitle: 'Add Sub Question',
        popupOkBtn: 'Add',
        popupCancelBtn: 'Cancel',
        popupAddSubQuestionBool: true
      },
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
