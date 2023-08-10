import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodereviewManagementComponent } from './codereview-management.component';

describe('CodereviewManagementComponent', () => {
  let component: CodereviewManagementComponent;
  let fixture: ComponentFixture<CodereviewManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodereviewManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodereviewManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
