import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StentreeComponent } from './stentree.component';

describe('StentreeComponent', () => {
  let component: StentreeComponent;
  let fixture: ComponentFixture<StentreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [StentreeComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StentreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
