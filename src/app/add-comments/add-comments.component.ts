import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface ModalData {
  popupHeaderTitle: string;
  popupOkBtn: string;
  popupCancelBtn: string;
  popupDeleteBool?: Boolean;
  popupAddSubQuestionBool?: Boolean;
  popupAddMainQuestionBool?: Boolean;
}

@Component({
  selector: 'cr-modal',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css']
})

export class AddCommentsComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AddCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData) { }

  onClick(value: any): void {
    let data = {
      value: value
    }
    this.dialogRef.close(data);
  }

  ngOnInit() {
    console.log(this.data);
  }

}


