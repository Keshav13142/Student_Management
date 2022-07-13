import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDeclineComponent } from './teacher-decline.component';

describe('TeacherDeclineComponent', () => {
  let component: TeacherDeclineComponent;
  let fixture: ComponentFixture<TeacherDeclineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDeclineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
