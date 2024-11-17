import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  constructor(private http: HttpClient) {}

  // API URLs (replace with your API endpoints)
  private apiUrl = 'https://your-api.com/rewards'; 

  sendReferral(email: string){
    return this.http.post(`${this.apiUrl}/refer`, email)
  }


}
