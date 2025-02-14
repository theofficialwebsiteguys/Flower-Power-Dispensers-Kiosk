import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {  
  private selectedUserSubject = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const sessionData = localStorage.getItem('sessionData');
    const token = sessionData ? JSON.parse(sessionData).token : null;

    if (!token) {
      console.error('No API key found, user needs to log in.');
      throw new Error('Unauthorized: No API key found');
    }

    return new HttpHeaders({
      Authorization: token,
    });
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/users/email?email=${email}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Error fetching user by email:', error);
          return throwError(() => error);
        })
      );
  }

  getUserByPhone(phone: string): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/users/phone?phone=${phone}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error('Error fetching user by phone:', error);
          return throwError(() => error);
        })
      );
  }

  setSelectedUser(user: any) {
    this.selectedUserSubject.next(user);
  }

  clearSelectedUser() {
    this.selectedUserSubject.next(null);
  }

  getSelectedUser(): any {
    return this.selectedUserSubject.getValue();
  }
  
}
