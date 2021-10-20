import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StprixjourneeComponent } from './stprixjournee.component';

describe('StprixjourneeComponent', () => {
  let component: StprixjourneeComponent;
  let fixture: ComponentFixture<StprixjourneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StprixjourneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StprixjourneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
