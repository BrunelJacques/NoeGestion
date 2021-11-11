import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StPrixJourneeComponent } from './stprixjournee.component';

describe('StprixjourneeComponent', () => {
  let component: StPrixJourneeComponent;
  let fixture: ComponentFixture<StPrixJourneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [StPrixJourneeComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StPrixJourneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
