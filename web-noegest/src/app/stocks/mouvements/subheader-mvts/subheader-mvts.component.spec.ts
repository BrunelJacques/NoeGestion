import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubheaderMvtsComponent } from './subheader-mvts.component';

describe('SubheaderMvtsComponent', () => {
  let component: SubheaderMvtsComponent;
  let fixture: ComponentFixture<SubheaderMvtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubheaderMvtsComponent]
    });
    fixture = TestBed.createComponent(SubheaderMvtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
