import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixJourneeComponent } from './prix-journee.component';

describe('PrixJourneeComponent', () => {
  let component: PrixJourneeComponent;
  let fixture: ComponentFixture<PrixJourneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrixJourneeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrixJourneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
