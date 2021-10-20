import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmdepartComponent } from './kmdepart.component';

describe('KmdepartComponent', () => {
  let component: KmdepartComponent;
  let fixture: ComponentFixture<KmdepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KmdepartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KmdepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
