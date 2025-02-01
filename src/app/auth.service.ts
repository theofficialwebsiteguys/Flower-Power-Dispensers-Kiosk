import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { FcmService } from './fcm.service';
import { ProductsService } from './products.service';
import { Product } from './product/product.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null); 

  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  private enrichedOrders = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private router: Router, @Inject(FcmService) private fcmService: FcmService, private productsService: ProductsService) {
    const user = localStorage.getItem('user_info');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  private apiUrl = `${environment.apiUrl}/users`;

  getUserInfo(): any {
    return this.userSubject.asObservable();
  }

  getCurrentUser() {
    return this.userSubject.value;
  }

  isLoggedIn(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  register(userData: any): Observable<any> {
    const defaultValues = { points: 0, business_id: 1 }; 
    const payload = { ...userData, ...defaultValues };
    return this.http.post(`${this.apiUrl}/register`, payload).pipe(
      tap(() => {
        this.login({
          email: userData.email,
          password: userData.password,
        }).subscribe();
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const payload = {
      ...credentials,
      businessId: '1', 
      businessName: 'Flower Power Dispensers', 
    };

    return this.http
      .post<{ sessionId: string; user: any; expiresAt: Date }>(
        `${this.apiUrl}/login`,
        payload
      )
      .pipe(
        tap((response: { sessionId: string; user: any; expiresAt: Date }) => {
          if (response) {
            this.storeSessionData(response.sessionId, response.expiresAt);
            this.authStatus.next(true); 
            this.userSubject.next(response.user); // Update userSubject with user info
            this.storeUserInfo(response.user);
            this.router.navigateByUrl('/rewards')
            this.validateSession();
            this.fcmService.initPushNotifications(response.user.email);
          }
          if (response.user) {
            this.storeUserInfo(response.user); 
          }
        })
      );
  }

  logout(): void {
    const sessionData = localStorage.getItem('sessionData');
    const headers = new HttpHeaders({
      Authorization: sessionData ? JSON.parse(sessionData).token : null, 
    });

    this.http
      .post<{ sessionId: string; user: any; expiresAt: Date }>(
        `${this.apiUrl}/logout`,
        {},
        { headers } 
      )
      .pipe(
        tap((response: { sessionId: string; user: any; expiresAt: Date }) => {
          if (response) {
            this.removeToken();
            this.authStatus.next(false);
            this.userSubject.next(null);
            this.router.navigate(['/rewards']);
            this.removeUser();
          }
        })
      )
      .subscribe();
  }

  private storeSessionData(sessionId: string, expiresAt: Date): void {
    const sessionData = {
      token: sessionId,
      expiry: expiresAt,
    };
    localStorage.setItem('sessionData', JSON.stringify(sessionData));
  }

  private storeUserInfo(user: any) {
    localStorage.setItem('user_info', JSON.stringify(user));
    this.userSubject.next(user);
  }

  private getSessionData(): { token: string; expiry: Date } | null {
    const sessionData = localStorage.getItem('sessionData');
    return sessionData ? JSON.parse(sessionData) : null;
  }

  private removeToken(): void {
    localStorage.removeItem('sessionData');
  }

  private removeUser(): void {
    localStorage.removeItem('user_info');
  }

  private hasToken(): boolean {
    return !!this.getSessionData();
  }

  isTokenExpired(expiry: Date): boolean {
    const currentTime = new Date().getTime(); 
    const expiryTime = new Date(expiry).getTime(); 
    return currentTime >= expiryTime;
  }

  sendPasswordReset(email: string): Observable<void> {
    const business_id = 1;
    return this.http.post<void>(`${this.apiUrl}/forgot-password`, {
      email,
      business_id,
    });
  }

  resetPassword(password: string, token: string | null): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset-password?token=${token}`, { password });
  }

  validateSession(): void {
    const sessionData = this.getSessionData();

    if (!sessionData || this.isTokenExpired(sessionData.expiry)) {
      this.authStatus.next(false);
      this.removeToken();
      this.removeUser();
      return;
    }

    const headers = new HttpHeaders({
      Authorization: sessionData?.token,
    });

    this.http
  .get<any>(`${this.apiUrl}/validate-session`, { headers })
  .pipe(
    tap((response) => {
      if (response) {
        this.authStatus.next(true);
        this.updateUserData();
        this.handleRecentOrders(response.orders);
        this.setAuthTokensAlleaves(response.authTokens?.alleaves);
        this.fcmService.initPushNotifications(this.getCurrentUser().email);
      } else {
        console.error('Authentication failed:', response.error || 'Unknown error');
        if (response.details) {
          console.error('Details:', response.details);
        }
        this.authStatus.next(false);
        this.logout();
      }
    }),
    catchError((error) => {
      console.error('HTTP request error:', error);
      this.authStatus.next(false);
      this.logout();
      return throwError(error);
    })
  )
  .subscribe();  
  }

  updateUserData(): void{
    const sessionData = localStorage.getItem('sessionData');
    const token = sessionData ? JSON.parse(sessionData).token : null;

    if (!token) {
      this.logout();
    }

    const headers = new HttpHeaders({
      Authorization: token,
    });

    this.http
      .get(`${this.apiUrl}/id/${this.getCurrentUser().id}`, { headers })
      .pipe(
        tap((response: any) => {
          this.storeUserInfo(response);
        }),
        catchError((error) => {
          console.error('Error toggling notifications:', error);
          return throwError(() => error);
        })
      ).subscribe();
  }

  toggleUserNotifications(userId: string) {
    const sessionData = localStorage.getItem('sessionData');
    const token = sessionData ? JSON.parse(sessionData).token : null;

    if (!token) {
      this.logout();
    }

    const headers = new HttpHeaders({
      Authorization: token,
    });

    const payload = { userId };

    return this.http
      .put(`${this.apiUrl}/toggle-notifications`, payload, { headers })
      .pipe(
        tap((response: any) => {

          this.storeUserInfo(response.user);
        }),
        catchError((error) => {
          console.error('Error toggling notifications:', error);
          return throwError(() => error);
        })
      );
  }

  validateResetToken(token: string) {
    return this.http
      .get<{ success: boolean; message: string }>(`${this.apiUrl}/validate-reset-token`, {
        params: { token }
      })
      .pipe(
        tap((response) => {
          if (response.success) {
            console.log('Reset token validation successful:', response.message);
          }
        }),
        catchError((error) => {
          console.error('Error validating reset token:', error);
          return throwError(() => error);
        })
      );
  }

   get orders() {
   return this.enrichedOrders.asObservable();
  }


  handleRecentOrders(orders: any[]) {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      const enrichedOrders = orders.map((order) => {
        const itemsWithDetails = Object.entries(order.items).map(([posProductId, quantity]) => {
          const product = products.find((p) => p.posProductId == posProductId);
          if (product) {
            return {
              ...product,
              quantity,
            };
          } else {
            console.warn(`No product found for posProductId: ${posProductId}`);
            return null;
          }
        }).filter((item) => item !== null);

        return {
          ...order,
          items: itemsWithDetails,
        };
      });

      this.enrichedOrders.next(enrichedOrders);
    });
  }
    
  setAuthTokensAlleaves(alleaves: any): void {
    sessionStorage.removeItem('authTokensAlleaves');
    if (alleaves) {
      sessionStorage.setItem('authTokensAlleaves', JSON.stringify(alleaves));
    }
  }

}
