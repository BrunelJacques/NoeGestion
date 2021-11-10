import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StfiltresComponent } from './stfiltres.component';

describe('StfiltresComponent', () => {
  let component: StfiltresComponent;
  let fixture: ComponentFixture<StfiltresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StfiltresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StfiltresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
