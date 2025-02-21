import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { from, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  // private getHeaders(): { [key: string]: string } {
  //   const sessionData = localStorage.getItem('sessionData');
  //   const token = sessionData ? JSON.parse(sessionData).token : null;
  
  //   if (!token) {
  //     console.error('No API key found, user needs to log in.');
  //     throw new Error('Unauthorized: No API key found');
  //   }
  
  //   return {
  //     Authorization: token,
  //     'Content-Type': 'application/json',
  //   };
  // }

  private getHeaders(): { [key: string]: string } {
    const sessionData = localStorage.getItem('sessionData');
    const token = sessionData ? JSON.parse(sessionData).token : null;
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json', // Ensure JSON data format
    };
  
    if (this.authService.isGuest()) {
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
  

  /** Get all users */
  // getUsers(): Observable<any[]> {
  //   return this.http.get<any[]>(`${environment.apiUrl}/users/`, { headers: this.getHeaders()});
  // }

  // /** Get all orders within a specific date range */
  // getOrdersByDateRange(queryParams: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${environment.apiUrl}/orders/date-range${queryParams}`, { headers: this.getHeaders() });
  // }

  getUserData(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/users/`, { headers: this.getHeaders() });
  }

  getOrdersByEmployeesData(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/orders/employees`, { headers: this.getHeaders() });
  }

  getOrdersData(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/orders/`, { headers: this.getHeaders() });
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
    return this.http.post<any>(`${environment.apiUrl}/notifications/sendPushByCategory`, payload, { headers: this.getHeaders() });
  }

  getCarouselImages(): Observable<{ images: string[] }> {
    const url = `${environment.apiUrl}/notifications/images`;
  
    const options = {
      method: 'GET',
      url,
      headers: { 'x-auth-api-key': environment.db_api_key } // Add headers
    };
  
    return from(CapacitorHttp.request(options)).pipe(
      map((response: any) => response.data) // Extract the `data` property
    );
  }
  

  replaceCarouselImage(file: File, index: number): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('replaceIndex', index.toString());
  
    // Prepare the request options
    const options = {
      method: 'POST',
      url: `${environment.apiUrl}/notifications/replace`,
      headers: this.getHeaders(),
      data: formData
    };
  
    // Use CapacitorHttp to send the request
    return from(CapacitorHttp.request(options)).pipe(
      map((response: any) => response.data)
    );
  }
  

sendCsvEmail(csvContent: string): Observable<any> {
  const payload = { csvContent };

  // Prepare the request options
  const options = {
    method: 'POST',
    url: `${environment.apiUrl}/businesses/send-csv-email`,
    headers: this.getHeaders(),
    data: payload
  };

  // Use CapacitorHttp to send the request
  return from(CapacitorHttp.request(options)).pipe(
    map((response: any) => response.data)
  );
}


}
