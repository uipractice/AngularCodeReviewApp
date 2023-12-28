import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface ModalData {
  popupHeaderTitle: string;
  popupOkBtn?: string;
  popupCancelBtn?: string;
  popupExportBtn?: string;
  popupDeleteBool?: Boolean;
  popupAddSubQuestionBool?: Boolean;
  popupAddMainQuestionBool?: Boolean;
  popupEditMainQuestionBool?: Boolean;
  popupExportBool?: Boolean;
  popupTabKey?:string
}

@Component({
  selector: 'cr-modal',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css']
})

export class AddCommentsComponent implements OnInit {
  textareaValue: any ;
  exportForm: FormGroup | any;

  constructor( public dialogRef: MatDialogRef<AddCommentsComponent>, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ModalData) {
      this.textareaValue=data.popupTabKey
    }

  ngOnInit() {
    this.exportForm = this.fb.group({
      emailList: ['', [Validators.required, Validators.pattern(/^\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\s*(?:,\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})*)$/)]]
    });
  }

  onClick(val: any): void {
    let data = {
      value: val
    }
    // console.log(data)
    this.dialogRef.close(data);
  }

  onExport() {
    if (this.exportForm.valid) {
      const emails = this.exportForm.value.emailList.split(',').map(email => email.trim());
      console.log('Exporting emails:', emails);

      let data = {
        value: emails
      }
      this.dialogRef.close(data);
    }
  }

}


