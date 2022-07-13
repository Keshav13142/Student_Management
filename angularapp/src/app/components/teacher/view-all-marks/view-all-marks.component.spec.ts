import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllMarksComponent } from './view-all-marks.component';

describe('ViewAllMarksComponent', () => {
  let component: ViewAllMarksComponent;
  let fixture: ComponentFixture<ViewAllMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
