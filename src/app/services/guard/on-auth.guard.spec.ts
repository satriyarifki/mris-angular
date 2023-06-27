import { TestBed } from '@angular/core/testing';

import { OnAuthGuard } from './on-auth.guard';

describe('OnAuthGuard', () => {
  let guard: OnAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
