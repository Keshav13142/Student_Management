import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/services/Student/Student';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewMarksComponent } from '../../student/view-marks/view-marks.component';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<ViewMarksComponent>,
    @Inject(MAT_DIALOG_DATA) public emp: any
  ) {}

  ngOnInit(): void {}
  close() {
    this.dialog.close();
  }
}
