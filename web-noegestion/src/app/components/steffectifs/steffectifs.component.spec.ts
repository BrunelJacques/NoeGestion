import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StEffectifsComponent } from './steffectifs.component';

describe('SteffectifsComponent', () => {
  let component: StEffectifsComponent;
  let fixture: ComponentFixture<StEffectifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [StEffectifsComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StEffectifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
