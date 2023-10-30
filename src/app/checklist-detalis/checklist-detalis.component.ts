import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/shared/services/modal.service';

@Component({
  selector: 'app-checklist-detalis',
  templateUrl: './checklist-detalis.component.html',
  styleUrls: ['./checklist-detalis.component.css']
})

export class ChecklistDetailsComponent implements OnInit {
  checklistHeading: string = '';

  ngOnInit(): void {
  }

  constructor(protected modalService: ModalService) { }

}
