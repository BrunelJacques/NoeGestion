import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmArriveeComponent } from './kmarrivee.component';

describe('KmarriveeComponent', () => {
  let component: KmArriveeComponent;
  let fixture: ComponentFixture<KmArriveeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [KmArriveeComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KmArriveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
