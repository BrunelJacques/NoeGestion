import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsComponent } from './params.component';

describe('ParamsComponent', () => {
  let component: ParamsComponent;
  let fixture: ComponentFixture<ParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ParamsComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
