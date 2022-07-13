import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Marks } from 'src/app/services/marks/Marks';
import { MarksService } from 'src/app/services/marks/marks.service';
import { ViewFileComponent } from '../view-file/view-file.component';

@Component({
  selector: 'app-view-marks',
  templateUrl: './view-marks.component.html',
  styleUrls: ['./view-marks.component.css'],
})
export class ViewMarksComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public mark: Marks,
    public this_dialog: MatDialogRef<ViewMarksComponent>,
    public marksService: MarksService
  ) {}
  role: string;
  date: any;
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.setDate();
  }
  setDate() {
    this.date = new Date(this.mark.datedOn).toLocaleDateString();
  }
  view() {
    const dialogRef = this.dialog.open(ViewFileComponent, {
      maxWidth: '120vh',
      maxHeight: '100vh',
      data: 'data:image/jpeg;base64,' + this.mark.image,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  close() {
    this.this_dialog.close();
  }
}
