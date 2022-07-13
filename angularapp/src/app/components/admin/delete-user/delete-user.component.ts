import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin/admin.service';
import { StudentService } from 'src/app/services/Student/student.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private diag: MatDialogRef<DeleteUserComponent>,
    private snack: MatSnackBar,
    private adminService: AdminService,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public emp: any
  ) {}

  ngOnInit(): void {
    this.diag.backdropClick().subscribe((result) => {
      this.diag.close(false);
    });
  }
  close() {
    this.diag.close(false);
  }
  delete() {
    this.adminService.deleteStudents(this.emp.email).subscribe(
      (data) => {
        this.snack.open('Deleted Successfully', 'OK', {
          duration: 3000,
        });
        this.diag.close(true);
      },
      (error) => {
        console.log(error);
        error;
      }
    );
  }
}
