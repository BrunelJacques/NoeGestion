import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StInventaireComponent } from './stinventaire.component';

describe('StinventaireComponent', () => {
  let component: StInventaireComponent;
  let fixture: ComponentFixture<StInventaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [StInventaireComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
