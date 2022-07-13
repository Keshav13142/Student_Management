import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Marks } from '../marks/Marks';
import baseUrl from '../url';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private router: Router, private http: HttpClient) {}
  public updateExpense(mark: Marks): Observable<any> {
    return this.http.put(`${baseUrl}/teacher/mark/${mark.entryId}`, mark);
  }
  public deleteExpense(mark: Marks): Observable<any> {
    return this.http.delete(`${baseUrl}/teacher/mark/${mark.entryId}`);
  }
  public setAllMarks() {
    return this.http.get(`${baseUrl}/teacher`);
  }
  public storeAllTeacherMarks() {
    this.setAllMarks().subscribe(
      (data: Marks[]) => {
        localStorage.setItem('teacherExp', JSON.stringify(data));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public getAllMarks() {
    return JSON.parse(localStorage.getItem('teacherExp'));
  }
}
