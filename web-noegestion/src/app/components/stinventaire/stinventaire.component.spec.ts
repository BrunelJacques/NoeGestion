import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StinventaireComponent } from './stinventaire.component';

describe('StinventaireComponent', () => {
  let component: StinventaireComponent;
  let fixture: ComponentFixture<StinventaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StinventaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StinventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
