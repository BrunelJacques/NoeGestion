import { TestBed } from '@angular/core/testing';

import { StMvtService } from './stmvt.service';

describe('StMvtService', () => {
  let service: StMvtService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(StMvtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
