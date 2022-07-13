import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable } from 'rxjs';
import baseUrl from '../url';
import { Marks } from './Marks';

@Injectable({
  providedIn: 'root',
})
export class MarksService {
  constructor(public http: HttpClient) {}
  public setAllMarks(): Observable<Marks[]> {
    return this.http.get<Marks[]>(`${baseUrl}/mark`);
  }
  public saveExpense(formData: any): Observable<any> {
    return this.http.post(`${baseUrl}/mark/v1`, formData);
  }
  public updateExpense(mark: Marks): Observable<String> {
    return this.http.put<String>(`${baseUrl}/mark/${mark.entryId}`, mark);
  }
  public setExpense(email: string) {
    return this.http.get<Marks[]>(`${baseUrl}/mark/${email}`);
  }
  public storeEmpExpenseByEmail(email: string) {
    this.setExpense(email).subscribe(
      (data: Marks[]) => {
        localStorage.setItem('marks', JSON.stringify(data));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public getMarks() {
    return JSON.parse(localStorage.getItem('marks'));
  }
  public deleteExpense(entryId: string): Observable<String> {
    return this.http.delete<String>(`${baseUrl}/teacher/${entryId}`);
  }
  public setLimit(email: string): Observable<number> {
    return this.http.get<number>(`${baseUrl}/mark/sum-month/${email}`);
  }
}
