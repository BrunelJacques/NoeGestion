import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectifsComponent } from './effectifs.component';

describe('EffectifsComponent', () => {
  let component: EffectifsComponent;
  let fixture: ComponentFixture<EffectifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EffectifsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EffectifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
