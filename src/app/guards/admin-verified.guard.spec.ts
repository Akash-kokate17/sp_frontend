import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminVerifiedGuard } from './admin-verified.guard';

describe('adminVerifiedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminVerifiedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
