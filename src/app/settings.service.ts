import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  DARK_MODE_ENABLED = 'darkModeEnabled';

  isLoggedIn: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.isDarkModeEnabled.next(this.getDarkModeEnabled());
      this.updateTheme();
    });
  }

  getDarkModeEnabled = (): boolean =>
    localStorage.getItem(this.DARK_MODE_ENABLED) === 'true' && this.isLoggedIn;

  setDarkModeEnabled = (value: boolean): void => {
    localStorage.setItem(this.DARK_MODE_ENABLED, JSON.stringify(value));
    this.isDarkModeEnabled.next(value);
    this.updateTheme();
  };

  updateTheme(): void {
    this.getDarkModeEnabled()
      ? this.document.body.classList.add('dark-mode')
      : this.document.body.classList.remove('dark-mode');
  }

  getUserNotifications(): Observable<any> {
    const userId = this.authService.getCurrentUser().id;
    const url = `${environment.apiUrl}/notifications/all?userId=${userId}`;
    return this.http.get<any>(url);
  }

  markNotificationAsRead(notificationId: number): Observable<any> {
    const url = `${environment.apiUrl}/notifications/mark-read/${notificationId}`;
    return this.http.put(url, {});
  }

  markAllNotificationsAsRead(userId: number): Observable<any> {
    const url = `${environment.apiUrl}/notifications/mark-all-read`;
    return this.http.put(url, { userId });
  }

  deleteNotification(notificationId: number): Observable<any> {
    const url = `${environment.apiUrl}/notifications/delete/${notificationId}`;
    return this.http.delete(url);
  }

  deleteAllNotifications(userId: number): Observable<any> {
    const url = `${environment.apiUrl}/notifications/delete-all`;
    return this.http.delete(url, { body: { userId } });
  }

  private isDarkModeEnabled = new BehaviorSubject<boolean>(
    this.getDarkModeEnabled()
  );
  isDarkModeEnabled$ = this.isDarkModeEnabled.asObservable();
}
