import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from 'src/app/services/Student/Student';
import { StudentService } from 'src/app/services/Student/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  emp: Student;
  status: string;
  constructor(
    public studentService: StudentService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setStudent();
  }
  setStudent() {
    this.emp = this.studentService.getStudent();
    if (this.emp.active == true) this.status = 'ACTIVE';
    else this.status = 'INACTIVE';
  }
}
