import { TestBed } from '@angular/core/testing';

import { SteffectifsService } from './steffectifs.service';

describe('SteffectifsService', () => {
  let service: SteffectifsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SteffectifsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
