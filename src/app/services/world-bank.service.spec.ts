import { TestBed } from '@angular/core/testing';

import { WorldBankService } from './world-bank.service';

describe('WorldBankService', () => {
  let service: WorldBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
