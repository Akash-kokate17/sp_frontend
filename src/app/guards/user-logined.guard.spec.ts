import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userLoginedGuard } from './user-logined.guard';

describe('userLoginedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userLoginedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
