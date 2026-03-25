import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { membreGuardGuard } from './membre-guard-guard';

describe('membreGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => membreGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
