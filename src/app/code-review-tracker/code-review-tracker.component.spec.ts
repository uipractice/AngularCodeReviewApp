import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeReviewTrackerComponent } from './code-review-tracker.component';

describe('CodeReviewTrackerComponent', () => {
  let component: CodeReviewTrackerComponent;
  let fixture: ComponentFixture<CodeReviewTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeReviewTrackerComponent]
    });
    fixture = TestBed.createComponent(CodeReviewTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
