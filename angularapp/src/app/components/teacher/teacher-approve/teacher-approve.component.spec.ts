import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherApproveComponent } from './teacher-approve.component';

describe('TeacherApproveComponent', () => 
{
  let component: TeacherApproveComponent;
  let fixture: ComponentFixture<TeacherApproveComponent>;

  beforeEach(async () => 
  {
    await TestBed.configureTestingModule({
      declarations: [ TeacherApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
