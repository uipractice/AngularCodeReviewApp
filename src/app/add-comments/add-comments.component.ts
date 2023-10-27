import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


export interface ModalData {
  name: string;
  color: string;
}

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css']
})


export class AddCommentsComponent  implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {

  }
  onClick(value:any): void {
    let data={
      value:value
    }
    this.dialogRef.close(data);
  }
  ngOnInit() {}
}


