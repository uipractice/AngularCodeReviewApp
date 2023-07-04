import { TestBed } from '@angular/core/testing';

import { CodeReviewService } from './code-review.service';

describe('CodeReviewService', () => {
  let service: CodeReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
