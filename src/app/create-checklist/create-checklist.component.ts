import { Component } from '@angular/core';

@Component({
  selector: 'app-create-checklist',
  templateUrl: './create-checklist.component.html',
  styleUrls: ['./create-checklist.component.css']
})
export class CreateChecklistComponent {
  checked = false;
  Sonarqube = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
}
