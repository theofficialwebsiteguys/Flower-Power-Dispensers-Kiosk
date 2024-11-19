import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private userSubject = new BehaviorSubject<any>(null); // Store user info

  private tokenKey = 'auth_token'; // Key for storing JWT in localStorage
  private authStatus = new BehaviorSubject<boolean>(this.hasToken()); // Observable for auth status

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user_info');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  // API URLs (replace with your API endpoints)
  private apiUrl = 'http://localhost:8080/api/users'; 

   // Observable for user info
  getUserInfo(): any {
    return {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '000-000-0000',
        dob: '1990-01-01', // New field added
      };
    return this.userSubject.asObservable();
  }

  // Get the currently stored user info
  getCurrentUser() {
    return this.userSubject.value;
  }

  // Check if user is logged in
  isLoggedIn(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  register(userData: any): Observable<any> {
    const defaultValues = { points: 0, business_id: 1 }; // Add default values if needed
    const payload = { ...userData, ...defaultValues };
    return this.http.post(`${this.apiUrl}/register`, payload).pipe(
      tap(() => {
        // Automatically login the user after registration
        this.login({ email: userData.email, password: userData.password }).subscribe();
      })
    );
  }
  

  // Log in a user
  login(credentials: any): Observable<any> {
    this.storeToken("test");
    this.authStatus.next(true);
    this.router.navigate(['/rewards']);
    return of()
    // return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
    //   tap((response: any) => {
    //     if (response && response.token) {
    //       this.storeToken(response.token);
    //       this.authStatus.next(true); // Notify subscribers of auth status
    //     }
          // if (response.user) {
          //   this.storeUserInfo(response.user)
          //   this.userSubject.next(response.user); // Save user info
          // }
    //   })
    // );
  }

  // Log out a user
  logout(): void {
    this.removeToken();
    this.authStatus.next(false);
    this.router.navigate(['/rewards']); // Redirect to login page
  }

  // Store the token securely
  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private storeUserInfo(user: any) {
    localStorage.setItem('user_info', JSON.stringify(user));
    this.userSubject.next(user);
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove the token
  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if token exists
  private hasToken(): boolean {
    return !!this.getToken();
  }

  // Get decoded token data (optional: use a library like jwt-decode for this)
  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    // Decode JWT (assumes base64 payload; adjust as needed)
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  // Check token expiration
  isTokenExpired(): boolean {
    const token = this.getDecodedToken();
    if (!token || !token.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return now > token.exp;
  }

  sendPasswordReset(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(password: string, token: string | null): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset-password`, { password, token });
  }


}
