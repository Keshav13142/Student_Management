import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Student } from '../Student/Student';
import baseUrl from '../url';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private snack: MatSnackBar) {}
  public setAllStudents() {
    return this.http.get<Student[]>(`${baseUrl}/admin`);
  }
  public storeAllAdminStudents() {
    this.setAllStudents().subscribe(
      (data: Student[]) => {
        localStorage.setItem('adminAllEmp', JSON.stringify(data));
      },
      (error) => {
        this.snack.open('Something Went wrong', 'OK', { duration: 3000 });
      }
    );
  }

  public setStudent(email: string) {
    this.http.get<Student>(`${baseUrl}/admin/${email}`).subscribe(
      (data: any) => {
        localStorage.setItem('adminEmp', JSON.stringify(data));
      },
      (error) => {
        this.snack.open('Something Went wrong', 'OK', { duration: 3000 });
      }
    );
  }
  public getStudent() {
    return JSON.parse(localStorage.getItem('adminEmp'));
  }
  public getStudents() {
    return JSON.parse(localStorage.getItem('adminAllEmp'));
  }
  public addStudents(emp: Student): Observable<string> {
    return this.http.post<string>(`${baseUrl}/admin`, emp);
  }
  public updateStudents(emp: Student): Observable<string> {
    return this.http.put<string>(`${baseUrl}/admin/${emp.email}`, emp);
  }
  public deleteStudents(email: string): Observable<string> {
    return this.http.delete<string>(`${baseUrl}/admin/${email}`);
  }
}
