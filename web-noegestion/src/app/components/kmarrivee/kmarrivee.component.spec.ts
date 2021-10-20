import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmarriveeComponent } from './kmarrivee.component';

describe('KmarriveeComponent', () => {
  let component: KmarriveeComponent;
  let fixture: ComponentFixture<KmarriveeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KmarriveeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KmarriveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
