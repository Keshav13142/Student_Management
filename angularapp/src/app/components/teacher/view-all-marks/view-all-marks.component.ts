import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from 'src/app/services/Student/Student';
import { Marks } from 'src/app/services/marks/Marks';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { ViewMarksComponent } from '../../student/view-marks/view-marks.component';
import { TeacherDeclineComponent } from '../teacher-decline/teacher-decline.component';

@Component({
  selector: 'app-view-all-marks',
  templateUrl: './view-all-marks.component.html',
  styleUrls: ['./view-all-marks.component.css'],
})
export class ViewAllMarksComponent implements OnInit {
  emp: Student;
  marks: Marks[] = [];
  approved: Marks[] = [];
  pending: Marks[] = [];
  declined: Marks[] = [];
  constructor(
    public dialog: MatDialog,
    public teacherService: TeacherService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.emp = JSON.parse(localStorage.getItem('emp'));
    this.setMarks();
  }
  public setMarks() {
    this.marks = this.teacherService.getAllMarks();
    this.seperate();
  }
  view(exp: any) {
    exp.reviewedBy = this.emp.username;
    const dialogRef = this.dialog.open(ViewMarksComponent, { data: exp });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  refresh() {
    this.teacherService.setAllMarks().subscribe(
      (data: Marks[]) => {
        this.marks = data;
        this.seperate();
        localStorage.setItem('teacherExp', JSON.stringify(data));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  seperate() {
    this.pending = [];
    this.approved = [];
    this.declined = [];
    for (let exp of this.marks) {
      if (exp.remark == '' || exp.remark == null) exp.remark = 'Processing';
      if (exp.status == 'approved') this.approved.push(exp);
      if (exp.status == 'pending') this.pending.push(exp);
      if (exp.status == 'declined') this.declined.push(exp);
    }
  }
}
