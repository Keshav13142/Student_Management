import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from 'src/app/services/Student/Student';
import { Marks } from 'src/app/services/marks/Marks';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { ViewMarksComponent } from '../../student/view-marks/view-marks.component';
import { TeacherDeclineComponent } from '../teacher-decline/teacher-decline.component';

@Component({
  selector: 'app-teacher-approve',
  templateUrl: './teacher-approve.component.html',
  styleUrls: ['./teacher-approve.component.css'],
})
export class TeacherApproveComponent implements OnInit {
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
  public approveExpense(exp: Marks) {
    exp.reviewedBy = this.emp.username;
    exp.status = 'approved';
    exp.remark = 'Verified';
    this.teacherService.updateExpense(exp).subscribe(
      (data: any) => {
        this.snack.open('Marks Approved', 'ok', { duration: 3000 });
        this.refresh();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public declineExpense(e: Marks) {
    e.reviewedBy = this.emp.username;
    const dialogRef = this.dialog.open(TeacherDeclineComponent, { data: e });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refresh();
        this.snack.open('Marks Declined', 'ok', { duration: 3000 });
      }
    });
  }
  public deleteExpense(exp: Marks) {
    this.teacherService.deleteExpense(exp).subscribe(
      (data: any) => {
        this.snack.open(data, 'ok', { duration: 3000 });
      },
      (error) => {
        console.log(error);
      }
    );
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
