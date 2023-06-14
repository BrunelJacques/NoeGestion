import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadtestComponent } from './headtest.component';

describe('HeadtestComponent', () => {
  let component: HeadtestComponent;
  let fixture: ComponentFixture<HeadtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadtestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
