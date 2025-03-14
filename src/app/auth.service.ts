import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { FcmService } from './fcm.service';
import { ProductsService } from './products.service';
import { Product } from './product/product.model';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null); 

  private authStatus = new BehaviorSubject<boolean>(true);

  private enrichedOrders = new BehaviorSubject<any[]>([]);

  private guestSubject = new BehaviorSubject<boolean>(false);
  guest$ = this.guestSubject.asObservable();

  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private router: Router, @Inject(FcmService) private fcmService: FcmService, private productsService: ProductsService) {
    const user = localStorage.getItem('user_info');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  setGuest(value: boolean) {
    this.guestSubject.next(value);
    console.log("here")
    this.validateSession();
  }

  isGuest(): boolean {
    return this.guestSubject.getValue();
  }

  private getHeaders(): { [key: string]: string } {
    const sessionData = localStorage.getItem('sessionData');
    const token = sessionData ? JSON.parse(sessionData).token : null;
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json', // Ensure JSON data format
    };
  
    if (this.isGuest()) {
      headers['x-auth-api-key'] = environment.db_api_key; // Set API key header for guests
    } else {
      if (!token) {
        console.error('No API key found, user needs to log in.');
        throw new Error('Unauthorized: No API key found');
      }
      headers['Authorization'] = `${token}`; // Set Bearer token for authenticated users
    }
  
    return headers;
  }
  

  getUserInfo(): any {
    return this.userSubject.asObservable();
  }

  getCurrentUser() {
    return this.userSubject.value;
  }

  get orders() {
    return this.enrichedOrders.asObservable(); // ✅ Always emits, even if empty
  }
  
  
  
  isLoggedIn(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  // register(userData: any, isCustomer: boolean): Observable<any> {
  //   const defaultValues = { points: 0, business_id: 1, role: isCustomer ? 'customer' : 'employee' }; 
  //   const payload = { ...userData, ...defaultValues };
  //   return this.http.post(`${this.apiUrl}/register`, payload).pipe(
  //     tap(() => {
  //       this.login({
  //         email: userData.email,
  //         password: userData.password,
  //       }).subscribe();
  //     })
  //   );
  // }

  register(userData: any, isCustomer: boolean): Observable<any> {
    const defaultValues = { points: 0, business_id: 1, role: isCustomer ? 'customer' : 'employee' };
    const payload = { ...userData, ...defaultValues };

    return new Observable((observer) => {
      CapacitorHttp.post({
        url: `${this.apiUrl}/register`,
        headers: { 'Content-Type': 'application/json' },
        data: payload,
      })
        .then((response) => {
          // this.login({
          //   email: userData.email,
          //   password: userData.password,
          // }).subscribe();
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const payload = {
      ...credentials,
      businessId: '1', 
      businessName: 'Flower Power Dispensers', 
    };

    return new Observable((observer) => {
      CapacitorHttp.post({
        url: `${this.apiUrl}/login`,
        headers: { 'Content-Type': 'application/json' },
        data: payload,
      })
        .then((response) => {
          if (response.status === 200) {
            const { sessionId, user, expiresAt } = response.data;
            this.storeSessionData(sessionId, expiresAt);
            //this allows the checkout
            this.setGuest(false);
            this.authStatus.next(true);
            //this sets user info
            this.userSubject.next(user);
            this.storeUserInfo(user);
            this.router.navigateByUrl('/home');
            this.validateSession();
            this.fcmService.initPushNotifications(user.email);
            observer.next(response.data);
            observer.complete();
          } else {
            observer.error(response);
          }
        })
        .catch((error) => observer.error(error));
    });

    // return this.http
    //   .post<{ sessionId: string; user: any; expiresAt: Date }>(
    //     `${this.apiUrl}/login`,
    //     payload
    //   )
    //   .pipe(
    //     tap((response: { sessionId: string; user: any; expiresAt: Date }) => {
    //       if (response) {
    //         this.storeSessionData(response.sessionId, response.expiresAt);
    //         this.authStatus.next(true); 
    //         this.userSubject.next(response.user); // Update userSubject with user info
    //         this.router.navigateByUrl('/rewards')
    //         this.validateSession();
    //         this.fcmService.initPushNotifications(response.user.email);
    //       }
    //       if (response.user) {
    //         this.storeUserInfo(response.user); 
    //       }
    //     })
    //   );
  }

  // logout(): void {
  //   const sessionData = localStorage.getItem('sessionData');
  //   const headers = new HttpHeaders({
  //     Authorization: sessionData ? JSON.parse(sessionData).token : null, 
  //   });

  //   this.http
  //     .post<{ sessionId: string; user: any; expiresAt: Date }>(
  //       `${this.apiUrl}/logout`,
  //       {},
  //       { headers } 
  //     )
  //     .pipe(
  //       tap((response: { sessionId: string; user: any; expiresAt: Date }) => {
  //         if (response) {
  //           this.removeToken();
  //           this.authStatus.next(false);
  //           this.userSubject.next(null);
  //           this.router.navigate(['/rewards']);
  //           this.removeUser();
  //         }
  //       })
  //     )
  //     .subscribe();
  // }

  logout(): void {
    const headers = this.getHeaders();

    CapacitorHttp.post({
      url: `${this.apiUrl}/logout`,
      headers,
      data: {},
    })
      .then(() => {
        this.removeToken();
        this.authStatus.next(false);
        this.userSubject.next(null);
        this.removeUser();
        window.location.reload();
      })
      .catch((error) => console.error('Logout failed:', error));
  }

  private storeSessionData(sessionId: string, expiresAt: Date): void {
    const sessionData = {
      token: sessionId,
      expiry: expiresAt,
    };
    localStorage.setItem('sessionData', JSON.stringify(sessionData));
  }

  storeUserInfo(user: any) {
    console.log(user)
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

  // sendPasswordReset(email: string): Observable<void> {
  //   const business_id = 1;
  //   return this.http.post<void>(`${this.apiUrl}/forgot-password`, {
  //     email,
  //     business_id,
  //   });
  // }

  sendPasswordReset(email: string): Observable<void> {
    return new Observable((observer) => {
      CapacitorHttp.post({
        url: `${this.apiUrl}/forgot-password`,
        headers: { 'Content-Type': 'application/json' },
        data: { email, business_id: 1 },
      })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  // resetPassword(password: string, token: string | null): Observable<void> {
  //   return this.http.post<void>(`${this.apiUrl}/reset-password?token=${token}`, { password });
  // }

  resetPassword(password: string, token: string | null): Observable<void> {
    return new Observable((observer) => {
      CapacitorHttp.post({
        url: `${this.apiUrl}/reset-password?token=${token}`,
        headers: { 'Content-Type': 'application/json' },
        data: { password },
      })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  // validateSession(): void {
  //   const sessionData = this.getSessionData();

  //   if (!sessionData || this.isTokenExpired(sessionData.expiry)) {
  //     this.authStatus.next(false);
  //     this.removeToken();
  //     this.removeUser();
  //     return;
  //   }

  //   const headers = new HttpHeaders({
  //     Authorization: sessionData?.token,
  //   });

  //   this.http
  // .get<any>(`${this.apiUrl}/validate-session`, { headers })
  // .pipe(
  //   tap((response) => {
  //     if (response) {
  //       this.authStatus.next(true);
  //       this.updateUserData();
  //       this.handleRecentOrders(response.orders);
  //       this.setAuthTokensAlleaves(response.authTokens?.alleaves);
  //       this.fcmService.initPushNotifications(this.getCurrentUser().email);
  //     } else {
  //       console.error('Authentication failed:', response.error || 'Unknown error');
  //       if (response.details) {
  //         console.error('Details:', response.details);
  //       }
  //       this.authStatus.next(false);
  //       this.logout();
  //     }
  //   }),
  //   catchError((error) => {
  //     console.error('HTTP request error:', error);
  //     this.authStatus.next(false);
  //     this.logout();
  //     return throwError(error);
  //   })
  // )
  // .subscribe();  
  // }

  validateSession(): void {
    const sessionData = this.getSessionData();

    // if (!sessionData || this.isTokenExpired(sessionData.expiry)) {
    //   // this.authStatus.next(false);
    //   this.removeToken();
    //   this.removeUser();
    //   return;
    // }

    const headers = this.getHeaders();

    const url = this.isGuest()
    ? `${this.apiUrl}/validate-session?bypassUserCheck=true`
    : `${this.apiUrl}/validate-session`;


    CapacitorHttp.get({
      url,
      headers,
    })
      .then((response) => {
        if (response.status === 200) {
          this.authStatus.next(true);
          this.setAuthTokensAlleaves(response.data.authTokens?.alleaves);
          if(!this.isGuest()){
            this.updateUserData();
            this.handleRecentOrders(response.data.orders);
            this.fcmService.initPushNotifications(this.getCurrentUser().email);
          }
        } else {
          this.authStatus.next(false);
          this.logout();
        }
      })
      .catch(() => {
        this.authStatus.next(false);
        this.logout();
      });
  }

  updateUserData(): void{
    const sessionData = localStorage.getItem('sessionData');
    const token = sessionData ? JSON.parse(sessionData).token : null;

    // if (!token) {
    //   this.logout();
    // }
    const headers = this.getHeaders();

    CapacitorHttp.get({
      url: `${this.apiUrl}/id/${this.getCurrentUser().id}`,
      headers,
    })
      .then((response) => {
        if (response.status === 200) {
          this.storeUserInfo(response.data);
        }
      })
      .catch((error) => console.error('Error updating user:', error));
  }

  // updateUserData(): void{
  //   const sessionData = localStorage.getItem('sessionData');
  //   const token = sessionData ? JSON.parse(sessionData).token : null;

  //   if (!token) {
  //     this.logout();
  //   }

  //   const headers = new HttpHeaders({
  //     Authorization: token,
  //   });

  //   this.http
  //     .get(`${this.apiUrl}/id/${this.getCurrentUser().id}`, { headers })
  //     .pipe(
  //       tap((response: any) => {
  //         this.storeUserInfo(response);
  //       }),
  //       catchError((error) => {
  //         console.error('Error toggling notifications:', error);
  //         return throwError(() => error);
  //       })
  //     ).subscribe();
  // }

  // toggleUserNotifications(userId: string) {
  //   const sessionData = localStorage.getItem('sessionData');
  //   const token = sessionData ? JSON.parse(sessionData).token : null;

  //   if (!token) {
  //     this.logout();
  //   }

  //   const headers = new HttpHeaders({
  //     Authorization: token,
  //   });

  //   const payload = { userId };

  //   return this.http
  //     .put(`${this.apiUrl}/toggle-notifications`, payload, { headers })
  //     .pipe(
  //       tap((response: any) => {

  //         this.storeUserInfo(response.user);
  //       }),
  //       catchError((error) => {
  //         console.error('Error toggling notifications:', error);
  //         return throwError(() => error);
  //       })
  //     );
  // }

  validateResetToken(token: string): Observable<any> {
    return new Observable((observer) => {
      CapacitorHttp.get({
        url: `${this.apiUrl}/validate-reset-token`,
        headers: { 'Content-Type': 'application/json' },
        params: { token },
      })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  

  // validateResetToken(token: string) {
  //   return this.http
  //     .get<{ success: boolean; message: string }>(`${this.apiUrl}/validate-reset-token`, {
  //       params: { token }
  //     })
  //     .pipe(
  //       tap((response) => {
  //         if (response.success) {
  //           console.log('Reset token validation successful:', response.message);
  //         }
  //       }),
  //       catchError((error) => {
  //         console.error('Error validating reset token:', error);
  //         return throwError(() => error);
  //       })
  //     );
  // }



  // handleRecentOrders(orders: any[]) {
  //   console.log(orders)
  //   this.productsService.getProducts().subscribe((products: Product[]) => {
  //     const enrichedOrders = orders.map((order) => {
  //       const itemsWithDetails = Object.entries(order.items).map(([posProductId, quantity]) => {
  //         const product = products.find((p) => p.posProductId == posProductId);
  //         if (product) {
  //           return {
  //             ...product,
  //             quantity,
  //           };
  //         } else {
  //           console.warn(`No product found for posProductId: ${posProductId}`);
  //           return null;
  //         }
  //       }).filter((item) => item !== null);

  //       return {
  //         ...order,
  //         items: itemsWithDetails,
  //       };
  //     });

  //     this.enrichedOrders.next(enrichedOrders);
  //   });
  // }

  handleRecentOrders(orders: any[]) {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      const enrichedOrders = orders.map((order) => ({
        ...order,
        items: Object.entries(order.items)
          .map(([posProductId, quantity]) => {
            const product = products.find((p) => p.posProductId == posProductId);
            return product ? { ...product, quantity } : null;
          })
          .filter((item) => item !== null),
      }));
  
      console.log("Enriched Orders Updated:", enrichedOrders);
      this.enrichedOrders.next([...enrichedOrders]); // Emit new array
    });
  }
  
    
  setAuthTokensAlleaves(alleaves: any): void {
    sessionStorage.removeItem('authTokensAlleaves');
    if (alleaves) {
      sessionStorage.setItem('authTokensAlleaves', JSON.stringify(alleaves));
    }
  }

  // getUserOrders(userId: string): Observable<any> {
  //   return this.http
  //     .get<any>(`${environment.apiUrl}/orders/user?user_id=${userId}`, { headers: this.getHeaders() })
  //     .pipe(
  //       map((orders) => this.handleRecentOrders(orders)), // ✅ Process response before returning
  //       catchError((error) => {
  //         console.error('Error fetching orders:', error);
  //         return throwError(() => error);
  //       })
  //     );
  // }

  async getUserOrders(userId?: number): Promise<any> {
    try {
      if(this.isGuest()){
        return;
      }
      console.log("Fetching user orders for ID:", userId);
      
      // Clear previous orders to trigger a refresh
      this.enrichedOrders.next(null as any);
  
      // Determine user ID: use provided ID or default to the current user's ID
      const user_id = userId ? String(userId) : String(this.getCurrentUser().id);
  
      const response = await CapacitorHttp.get({
        url: `${environment.apiUrl}/orders/user`,
        headers: this.getHeaders(),
        params: { user_id }, 
      });
  
      console.log("API Response:", response);
  
      if (typeof response.data === "number") {
        response.data = String(response.data);
      }
  
      try {
        if (typeof response.data === "string") {
          response.data = JSON.parse(response.data);
        }
      } catch (e) {
        console.warn("Failed to parse response:", e);
      }
  
      // Handle recent orders & ensure update triggers
      this.handleRecentOrders(response.data);
  
      // // Force an update to ensure orders refresh in the component
      // this.enrichedOrders.next([...response.data]);
  
      return response.data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  }
  

}
