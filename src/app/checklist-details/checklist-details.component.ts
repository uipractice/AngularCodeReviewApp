import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist-details',
  templateUrl: './checklist-details.component.html',
  styleUrls: ['./checklist-details.component.css']
})

export class ChecklistDetailsComponent implements OnInit {
  checklistHeading: string = '';

  quesObj = {
    "data": [
      {
        "key": "Functional",
        "value": [
          {
            "key": "Does code meet functional requirement",
            "options": "",
            "comments": "",
            "rating": "",
            "achievedRating": ""
          },
          {
            "key": "Is there any excess functionality in the code but not declined in the Story?",
            "value": [
              {
                "key": "Does it define the expected system service and behavior",
                "options": "",
                "comments": "",
                "rating": "",
                "achievedRating": ""
              },
              {
                "key": "Is is expressed in Use Case form or user story as they exhibit externally visible functional behaviour",
                "options": "",
                "comments": "",
                "rating": "",
                "achievedRating": ""
              }
            ]
          }
        ]
      }
    ]
  }

  ngOnInit(): void {
  }

}











