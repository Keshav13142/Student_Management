import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Student } from 'src/app/services/Student/Student';
import { StudentService } from 'src/app/services/Student/student.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  search = 'Name';
  searchVal = '';
  empList: Student[] = [];
  empl: Student[] = [];
  constructor(
    private adminService: AdminService,
    public router: Router,
    private snack: MatSnackBar,
    private studentService: StudentService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.setStudents();
  }
  view(empl: any) {
    const dialogRef = this.dialog.open(ViewUserComponent, { data: empl });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  edit(empl: any) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      maxWidth: '120vh',
      maxHeight: '100vh',
      data: empl,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.refresh();
    });
  }
  delete(empl: any) {
    const dialogRef = this.dialog.open(DeleteUserComponent, { data: empl });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.refresh();
    });
  }
  Search() {
    this.empl = this.empList;
    if (this.search == 'Name') {
      this.empl = this.empl.filter((res) => {
        return res.username
          .toLocaleLowerCase()
          .match(this.searchVal.toLocaleLowerCase());
      });
    }
    if (this.search == 'Email') {
      this.empl = this.empl.filter((res) => {
        return res.email
          .toLocaleLowerCase()
          .match(this.searchVal.toLocaleLowerCase());
      });
    }
  }
  reset() {
    this.searchVal = '';
    this.empl = this.empList;
  }
  setStudents() {
    this.empList = this.adminService.getStudents();
    this.empl = this.adminService.getStudents();
  }
  refresh() {
    this.adminService.setAllStudents().subscribe(
      (data: Student[]) => {
        this.empList = data;
        this.empl = data;
        localStorage.setItem('adminAllEmp', JSON.stringify(data));
      },
      (error) => {
        this.snack.open('Something Went wrong', 'OK', { duration: 3000 });
      }
    );
  }
}
