import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { from, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

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

  /** Get all users */
  // getUsers(): Observable<any[]> {
  //   return this.http.get<any[]>(`${environment.apiUrl}/users/`, { headers: this.getHeaders()});
  // }

  // /** Get all orders within a specific date range */
  // getOrdersByDateRange(queryParams: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${environment.apiUrl}/orders/date-range${queryParams}`, { headers: this.getHeaders() });
  // }

  getAdminData(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/users/`, { headers: this.getHeaders() });
  }

  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file); // Append file to FormData

    console.log('FormData Entries:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    
    return this.http.post<{ imageUrl: string }>(`${environment.apiUrl}/notifications/upload-image`, formData, {
      headers: this.getHeaders(),
    });
  }

  sendPushNotificationToAll(title: string, body: string, imageUrl?: string): Observable<any> {
    const payload = { title, body, image: imageUrl };
    return this.http.post<any>(`${environment.apiUrl}/notifications/sendPushToAll`, payload, { headers: this.getHeaders() });
  }


  sendPushNotificationToCategory(title: string, body: string, category: string, imageUrl?: string): Observable<any> {
    const payload = { title, body, category, image: imageUrl };
    return this.http.post<any>(`${environment.apiUrl}/notifications/sendPushByCategory`, payload);
  }

  getCarouselImages(): Observable<{ images: string[] }> {
    const url = `${environment.apiUrl}/notifications/images`;
    const options = {
      method: 'GET',
      url
    };

    return from(CapacitorHttp.request(options)).pipe(
      map((response: HttpResponse) => response.data) // Extract the `data` property
    );
  }

  /** Replace a carousel image */
  replaceCarouselImage(file: File, index: number): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('replaceIndex', index.toString()); // Send index info

    return this.http.post<{ imageUrl: string }>(`${environment.apiUrl}/notifications/replace`, formData, {
      headers: this.getHeaders()
    });
  }
}
