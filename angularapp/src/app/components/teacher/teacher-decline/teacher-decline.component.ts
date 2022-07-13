import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MarksService } from 'src/app/services/marks/marks.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-decline',
  templateUrl: './teacher-decline.component.html',
  styleUrls: ['./teacher-decline.component.css'],
})
export class TeacherDeclineComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public mark: any,
    public this_dialog: MatDialogRef<TeacherDeclineComponent>,
    public marksService: MarksService,
    private teacherService: TeacherService
  ) {}
  role: string;
  date: any;
  remarks: '';
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.setDate();
    this.this_dialog.backdropClick().subscribe((result) => {
      this.this_dialog.close(false);
    });
  }
  setDate() {
    this.date = new Date(this.mark.datedOn).toLocaleDateString();
    if (this.mark.remark == '' || this.mark.remark == null)
      this.mark.remark == 'Processing';
  }
  close() {
    this.this_dialog.close();
  }
  submit() {
    this.mark.status = 'declined';
    this.mark.remark = this.remarks;
    this.teacherService.updateExpense(this.mark).subscribe(
      (data: any) => {
        this.this_dialog.close(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
