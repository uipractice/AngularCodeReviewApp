import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeReviewerDetailsComponent } from './code-reviewer-details.component';

describe('CodeReviewerDetailsComponent', () => {
  let component: CodeReviewerDetailsComponent;
  let fixture: ComponentFixture<CodeReviewerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeReviewerDetailsComponent]
    });
    fixture = TestBed.createComponent(CodeReviewerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
