import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StEntreesComponent } from './stentrees.component';

describe('EntreesComponent', () => {
  let component: StEntreesComponent;
  let fixture: ComponentFixture<StEntreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StEntreesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StEntreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
