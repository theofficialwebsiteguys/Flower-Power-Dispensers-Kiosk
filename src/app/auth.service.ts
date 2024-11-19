import { HttpClient, HttpResponse } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:3333/api/users'; 

   // Observable for user info
  getUserInfo(): any {
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
  login(credentials: { email: string; password: string }): Observable<any> {
    // Add business info to the payload
    const payload = {
      ...credentials,
      businessId: '1', // Replace with your business ID logic
      businessName: 'Flower Power Dispensers', // Replace with your business name logic
    };
  
    return this.http.post<{sessionId: string, user: any, expiresAt: Date}>(`${this.apiUrl}/login`, payload).pipe(
      tap((response: {sessionId: string, user: any, expiresAt: Date}) => {
        if (response) {
          // Save the session details or token
          this.storeToken(response.sessionId); // Assuming sessionId is used as the token
          this.authStatus.next(true); // Notify subscribers of auth status
        }
        if (response.user) {
          this.storeUserInfo(response.user); // Save user information locally
        }
      })
    );
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
