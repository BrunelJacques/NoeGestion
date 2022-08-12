import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrigineComponent } from './camp.component';

describe('OrigineComponent', () => {
  let component: OrigineComponent;
  let fixture: ComponentFixture<OrigineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrigineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrigineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
