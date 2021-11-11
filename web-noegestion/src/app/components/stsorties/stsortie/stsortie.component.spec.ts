import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StsortieComponent } from './stsortie.component';

describe('StsortieComponent', () => {
  let component: StsortieComponent;
  let fixture: ComponentFixture<StsortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [StsortieComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StsortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
