import { TestBed } from '@angular/core/testing';

import { StSortieMvtService } from './st-sortie-mvt.service';

describe('StSortieMvtService', () => {
  let service: StSortieMvtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StSortieMvtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
