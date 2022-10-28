import { TestBed } from '@angular/core/testing';

import { MvtService } from './mvt.service';

describe('MvtService', () => {
  let service: MvtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MvtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
