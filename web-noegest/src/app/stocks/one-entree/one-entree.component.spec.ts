import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneEntreeComponent } from './one-entree.component';

describe('OneEntreeComponent', () => {
  let component: OneEntreeComponent;
  let fixture: ComponentFixture<OneEntreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneEntreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneEntreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
