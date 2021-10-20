import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteffectifsComponent } from './steffectifs.component';

describe('SteffectifsComponent', () => {
  let component: SteffectifsComponent;
  let fixture: ComponentFixture<SteffectifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteffectifsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SteffectifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
