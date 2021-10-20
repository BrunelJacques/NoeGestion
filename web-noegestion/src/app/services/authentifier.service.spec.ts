import { TestBed } from '@angular/core/testing';

import { AuthentifierService } from './authentifier.service';

describe('AuthentifierService', () => {
  let service: AuthentifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
