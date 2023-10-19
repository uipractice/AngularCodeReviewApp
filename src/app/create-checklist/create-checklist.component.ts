import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-checklist',
  templateUrl: './create-checklist.component.html',
  styleUrls: ['./create-checklist.component.css']
})

export class CreateChecklistComponent {
  constructor(private router: Router) { }

  checked = false;
  Sonarqube = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  navigateToAdminPage() {
    this.router.navigate(['/checklist-details'])
  }
}



