import { TestBed } from '@angular/core/testing';

import { StSortiesMvtsService } from './st-sorties-mvts.service';

describe('StSortiesMvtsService', () => {
  let service: StSortiesMvtsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StSortiesMvtsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
