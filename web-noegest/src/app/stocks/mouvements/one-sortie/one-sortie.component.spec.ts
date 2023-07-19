import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSortieComponent } from './one-sortie.component';

describe('OneSortieComponent', () => {
  let component: OneSortieComponent;
  let fixture: ComponentFixture<OneSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneSortieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
