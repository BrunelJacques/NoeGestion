import { TestBed } from '@angular/core/testing';

import { ParamsValidatorService } from './params-validator.service';

describe('ParamsValidatorService', () => {
  let service: ParamsValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamsValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
