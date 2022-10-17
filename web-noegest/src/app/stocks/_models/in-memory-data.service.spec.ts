import { TestBed } from '@angular/core/testing';

import { InMemDtServMvts } from './in-memory-data.service';

describe('InMemDtServMvts', () => {
  let service: InMemDtServMvts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemDtServMvts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
