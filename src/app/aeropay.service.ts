import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AeropayService {
  private merchantToken: string | null = null;
  private usedForMerchantToken: string | null = null;

  constructor(private http: HttpClient) {}

  fetchMerchantToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json'
    });

    const payload = {
      scope: 'merchant',
      api_key: '016c0534-ff89-4626-b8a4-fdbe7fbe1f08', // Replace with actual API Key
      api_secret: '13322af3-39fb-462d-865c-9f238b248abd', // Replace with actual API Secret
      id: '1760',
      userId: '1102575'
    };

    return this.http.post<any>(`https://staging-api.aeropay.com/token`, payload, { headers }).pipe(
      tap(response => {
        if (response.token) {
          this.setMerchantToken(response.token, response.TTL);
        }
      })
    );
  }

  fetchUsedForMerchantToken(userId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json'
    });

    const payload = {
      scope: 'userForMerchant',
      api_key: '016c0534-ff89-4626-b8a4-fdbe7fbe1f08', // Replace with actual API Key
      api_secret: '13322af3-39fb-462d-865c-9f238b248abd', // Replace with actual API Secret
      id: '1760',
      userId: userId
    };

    return this.http.post<any>(`https://staging-api.aeropay.com/token`, payload, { headers }).pipe(
      tap(response => {
        if (response.token) {
          this.setUsedForMerchantToken(response.token, response.TTL);
        }
      })
    );
  }

  setMerchantToken(token: string, ttl: number): void {
    this.merchantToken = token;
  }

  getMerchantToken(): string | null {
      return this.merchantToken;
  }

  isMerchantTokenValid(): boolean {
    return this.getMerchantToken() !== null;
  }

  setUsedForMerchantToken(token: string, ttl: number): void {
    this.usedForMerchantToken = token;
  }

  getUsedForMerchantToken(): string | null {
      return this.usedForMerchantToken;
  }

  isUsedForMerchantTokenValid(): boolean {
    return this.getUsedForMerchantToken() !== null;
  }

  createUser(userData: { first_name: string; last_name: string; phone: string; email: string; }): Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('accept', 'application/json')
    .set('X-API-Version', '1.1')
    .set('authorizationToken', `Bearer ${this.getMerchantToken()}`);
  
  
    const payload = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone_number: userData.phone,
      email: userData.email
    };
  
    return this.http.post<any>('https://staging-api.aeropay.com/user', payload, { headers }).pipe(
      tap(response => console.log('✅ User Created:', response))
    );
  }

  verifyUser(userId: string, code: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', 'application/json')
      .set('authorizationToken', `Bearer ${this.getMerchantToken()}`);
  
    const payload = { userId, code };
  
    return this.http.post<any>('https://staging-api.aeropay.com/confirmUser', payload, { headers }).pipe(
      tap(response => console.log('✅ AeroPay User Verified:', response))
    );
  }
  
  getAerosyncCredentials(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', 'application/json')
      .set('authorizationToken', `Bearer ${this.getUsedForMerchantToken()}`);
  
    return this.http.get<any>('https://staging-api.aeropay.com/aggregatorCredentials?aggregator=aerosync', { headers }).pipe(
      tap(response => console.log('✅ Aerosync Credentials Retrieved:', response))
    );
  }
  
  linkBankAccount(userId: string, userPassword: string): Observable<any> {
    const token = this.getUsedForMerchantToken();
    if (!token) {
      console.error('Error: No authentication token found.');
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', 'application/json')
      .set('authorizationToken', `Bearer ${token}`);

    const payload = {
      user_id: userId,
      user_password: userPassword,
      aggregator: 'aerosync'
    };

    console.log('🚀 Linking Bank Account to AeroPay with Payload:', payload);

    return this.http.post<any>('https://staging-api.aeropay.com/linkAccountFromAggregator', payload, { headers }).pipe(
      tap(response => console.log('✅ Bank Account Linked:', response))
    );
  }
  
  createTransaction(amount: string, bankAccountId: string | null): Observable<any> {
    const token = this.getUsedForMerchantToken(); // Ensure the token is set
    if (!token) {
      console.error('❌ Error: No authentication token found.');
      throw new Error('Authentication token is missing');
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', 'application/json')
      .set('authorizationToken', `Bearer ${token}`);

    // Generate a unique transaction UUID
    const transactionUUID = uuidv4();

    const payload: any = {
      amount: amount,
      merchantId: '1760',
      uuid: transactionUUID,
      bankAccountId: bankAccountId
    };

    console.log('🚀 Initiating AeroPay Transaction with Payload:', payload);

    return this.http.post<any>('https://staging-api.aeropay.com/transaction', payload, { headers }).pipe(
      tap(response => console.log('✅ AeroPay Transaction Created:', response))
    );
  }
  
}
