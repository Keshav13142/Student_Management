import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from 'src/app/services/Student/Student';
import { StudentService } from 'src/app/services/Student/student.service';
import { MarksService } from 'src/app/services/marks/marks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-marks',
  templateUrl: './add-marks.component.html',
  styleUrls: ['./add-marks.component.css'],
})
export class AddMarksComponent implements OnInit {
  file: File = null;
  email = '';
  date = new FormControl({ values: '', disabled: true });
  public emp: Student;
  mark = {
    entryId: null,
    entryNumber: null,
    marks: null,
    description: null,
    datedOn: null,
    claimedBy: null,
  };

  constructor(
    private snack: MatSnackBar,
    public marksService: MarksService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.date.disable();
    this.email = localStorage.getItem('email');
    this.setStudents();
  }

  submit() {
    if (this.mark.marks <= 0 || this.mark.marks == null)
      this.snack.open('Mark Cannot be Empty!!', 'Ok');
    else if (this.date.value.values == '')
      this.snack.open('Date Cannot be Empty !!', 'Ok');
    else if (this.file == null)
      this.snack.open('Please Upload your file !!', 'Ok');
    else {
      this.mark.entryNumber = this.getRandomInt(
        this.date.value.getSeconds(),
        2000
      );
      this.mark.entryId = 'exp_' + this.date.value.getTime();
      this.mark.claimedBy = this.emp;
      this.mark.datedOn = this.date.value;
      const formData = new FormData();
      formData.append('marks', JSON.stringify(this.mark));
      formData.append('file', this.file);
      this.marksService.saveExpense(formData).subscribe(
        (data: any) => {
          this.snack.open('Marks Added Sucessfully', 'OK', {
            duration: 2000,
          });
          this.marksService.storeEmpExpenseByEmail(this.emp.email);
          this.marksService.setLimit(this.emp.email);
        },
        (error) => {
          console.log(error);
          this.snack.open('Something Went Wrong', 'OK', { duration: 2000 });
        }
      );
    }
  }
  setStudents() {
    this.emp = this.studentService.getStudent();
  }
  selectFile(event) {
    const file = event.target.files[0];
    this.file = file;
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    let res = Math.floor(Math.random() * (max - min + 1)) + min;
    return res;
  }
}
