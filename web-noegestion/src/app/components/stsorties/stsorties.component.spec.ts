import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StSortiesComponent } from './stsorties.component';

describe('SortiesComponent', () => {
  let component: StSortiesComponent;
  let fixture: ComponentFixture<StSortiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [StSortiesComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StSortiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
