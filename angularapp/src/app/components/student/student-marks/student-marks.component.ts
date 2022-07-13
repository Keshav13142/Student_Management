import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/services/Student/student.service';
import { Marks } from 'src/app/services/marks/Marks';
import { MarksService } from 'src/app/services/marks/marks.service';
import { ViewFileComponent } from '../view-file/view-file.component';

@Component({
  selector: 'app-student-marks',
  templateUrl: './student-marks.component.html',
  styleUrls: ['./student-marks.component.css'],
})
export class StudentMarksComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public marksService: MarksService,
    private studentService: StudentService,
    private snack: MatSnackBar
  ) {}
  marks: Marks[];
  approved: Marks[] = [];
  pending: Marks[] = [];
  declined: Marks[] = [];
  file: any = [];
  email = '';
  emp = {
    active: null,
    email: null,
    mobileNumber: null,
    password: null,
    role: null,
    username: null,
  };
  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.setStudent();
    this.setMarks();
  }
  view(exp: any) {
    const dialogRef = this.dialog.open(ViewFileComponent, {
      maxWidth: '120vh',
      maxHeight: '100vh',
      data: 'data:image/jpeg;base64,' + exp.image,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  setMarks() {
    this.marks = this.marksService.getMarks();
    this.setDate(this.marks);
    this.seperate();
  }
  refresh() {
    this.marksService.setExpense(this.emp.email).subscribe(
      (data: Marks[]) => {
        this.marks = data;
        this.setDate(this.marks);
        this.seperate();
        localStorage.setItem('marks', JSON.stringify(data));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  setStudent() {
    this.emp = this.studentService.getStudent();
  }
  setDate(exp: Marks[]) {
    for (let i = 0; i < exp.length; i++) {
      if (exp[i].remark == '' || exp[i].remark == null)
        exp[i].remark = 'Processing';
      exp[i].datedOn = new Date(exp[i].datedOn);
      this.file[i] = 'data:image/jpeg;base64,' + exp[i].image;
    }
  }
  seperate() {
    this.approved = [];
    this.declined = [];
    this.pending = [];
    for (let exp of this.marks) {
      if (exp.status == 'approved') this.approved.push(exp);
      if (exp.status == 'pending') this.pending.push(exp);
      if (exp.status == 'declined') this.declined.push(exp);
    }
  }
}
