import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCodeReviewTrackerComponent } from './start-code-review-tracker.component';

describe('StartCodeReviewTrackerComponent', () => {
  let component: StartCodeReviewTrackerComponent;
  let fixture: ComponentFixture<StartCodeReviewTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartCodeReviewTrackerComponent]
    });
    fixture = TestBed.createComponent(StartCodeReviewTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
