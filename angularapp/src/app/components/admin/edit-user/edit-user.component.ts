import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin/admin.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  status = 'active';
  hide = true;
  hide_cf = true;
  pass = '';
  pass_match = true;
  constructor(
    public dialog: MatDialog,
    private diag: MatDialogRef<EditUserComponent>,
    private snack: MatSnackBar,
    private adminService: AdminService,
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
  formSubmit() {
    if (
      this.emp.username == '' ||
      this.emp.username == null ||
      this.emp.email == '' ||
      this.emp.email == null
    ) {
      this.snack.open('Mandatory fields cannot be empty', 'ok', {
        duration: 3000,
      });
      return;
    }
    if (this.emp.password != this.pass) {
      this.pass_match = false;
      this.snack.open("Passwords Don't Match", 'OK');
    } else {
      if (this.status == 'active') {
        this.emp.active = true;
      } else {
        this.emp.active = false;
      }
      this.adminService.updateStudents(this.emp).subscribe(
        (data) => {
          this.diag.close(true);
          this.snack.open('Updated Successfully', 'OK', {
            duration: 3000,
          });
          this.adminService.setAllStudents();
          this.diag.close(true);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
