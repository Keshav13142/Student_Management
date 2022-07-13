import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../admin/admin.service';
import { MarksService } from '../marks/marks.service';
import { TeacherService } from '../teacher/teacher.service';

import baseUrl from '../url';
import { Student } from './Student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  role: string;
  constructor(
    private teacherService: TeacherService,
    public snack: MatSnackBar,
    public http: HttpClient,
    private router: Router,
    private adminService: AdminService,
    private marksService: MarksService
  ) {}
  public setStudent(email: string) {
    this.http.get<Student>(`${baseUrl}/student/${email}`).subscribe(
      (data: Student) => {
        if (data.active == false) {
          Swal.fire(
            'Account not Authorized',
            'Contact Admin for Further Details',
            'info'
          );
          return;
        } else {
          localStorage.setItem('role', data.role);
          localStorage.setItem('role', data.role);
          if (data.role == 'admin') {
            this.adminService.storeAllAdminStudents();
          } else if (data.role == 'teacher') {
            this.marksService.storeEmpExpenseByEmail(data.email);
            this.teacherService.storeAllTeacherMarks();
            this.setAllStudents();
          } else if (data.role == 'student') {
            this.marksService.storeEmpExpenseByEmail(data.email);
          }
          localStorage.setItem('emp', JSON.stringify(data));
          Swal.fire({
            title: 'Welcome',
            text: 'Login Success!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate([data.role]);
            }
          });
        }
      },
      (error) => {
        this.snack.open('Something Went Wrong', 'OK', { duration: 3000 });
      }
    );
  }
  public setAllStudents() {
    this.http.get<Student[]>(`${baseUrl}/teacher`).subscribe(
      (data: Student[]) => {
        localStorage.setItem('Allemp', JSON.stringify(data));
      },
      (error) => {
        this.snack.open('Something Went Wrong', 'OK', { duration: 3000 });
      }
    );
  }
  public getStudent() {
    return JSON.parse(localStorage.getItem('emp'));
  }
  public getAllEmp() {
    return JSON.parse(localStorage.getItem('Allemp'));
  }
}
