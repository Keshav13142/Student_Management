import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Student } from 'src/app/services/Student/Student';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-admin-authorize',
  templateUrl: './admin-authorize.component.html',
  styleUrls: ['./admin-authorize.component.css'],
})
export class AdminAuthorizeComponent implements OnInit {
  empList: Student[] = [];
  notAuth: Student[] = [];
  constructor(
    private adminService: AdminService,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setStudents();
  }
  setStudents() {
    this.empList = this.adminService.getStudents();
    this.setNotAuth();
  }
  setNotAuth() {
    this.notAuth = [];
    for (let emp of this.empList) {
      if (!emp.active) {
        this.notAuth.push(emp);
      }
    }
  }

  auth(emp: Student, status: string) {
    if (status == 'true') {
      emp.active = true;
    } else {
      this.delete(emp);
      return;
    }
    this.adminService.updateStudents(emp).subscribe(
      (data) => {
        this.adminService.setAllStudents().subscribe(
          (data: Student[]) => {
            this.empList = data;
            this.setNotAuth();
            localStorage.setItem('adminAllEmp', JSON.stringify(data));
            this.snack.open('User Authorized', 'OK', {
              duration: 3000,
            });
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
  delete(empl: any) {
    const dialogRef = this.dialog.open(DeleteUserComponent, { data: empl });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.refresh();
    });
  }
  view(empl: any) {
    const dialogRef = this.dialog.open(ViewUserComponent, { data: empl });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  refresh() {
    this.adminService.setAllStudents().subscribe(
      (data: Student[]) => {
        this.empList = data;
        this.setNotAuth();
        localStorage.setItem('adminAllEmp', JSON.stringify(data));
      },
      (error) => {
        console.log(error);
        this.snack.open('Something Went wrong', 'OK', { duration: 3000 });
      }
    );
  }
}
