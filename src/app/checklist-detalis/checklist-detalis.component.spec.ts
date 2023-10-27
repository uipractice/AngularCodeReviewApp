import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistDetailsComponent } from './checklist-detalis.component';

describe('ChecklistDetalisComponent', () => {
  let component: ChecklistDetailsComponent;
  let fixture: ComponentFixture<ChecklistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChecklistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
