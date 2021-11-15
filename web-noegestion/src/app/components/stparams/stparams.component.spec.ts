import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StParamsComponent } from './stparams.component';

describe('StParamsComponent', () => {
  let component: StParamsComponent;
  let fixture: ComponentFixture<StParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [StParamsComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
