import { TestBed } from '@angular/core/testing';

import { SpServiceService } from './sp-service.service';

describe('SpServiceService', () => {
  let service: SpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
