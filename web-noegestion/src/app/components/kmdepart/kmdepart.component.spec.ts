import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmDepartComponent } from './kmdepart.component';

describe('KmdepartComponent', () => {
  let component: KmDepartComponent;
  let fixture: ComponentFixture<KmDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KmDepartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KmDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
