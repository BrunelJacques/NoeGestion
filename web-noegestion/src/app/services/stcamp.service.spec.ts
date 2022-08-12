import { TestBed } from '@angular/core/testing';

import { StCampServiceService } from './stcamp.service';

describe('StCampServiceService', () => {
  let service: StCampServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StCampServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
