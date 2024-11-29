import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  DARK_MODE_ENABLED = 'darkModeEnabled';

  getDarkModeEnabled = (): boolean =>
    localStorage.getItem(this.DARK_MODE_ENABLED) === 'true';

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

  private isDarkModeEnabled = new BehaviorSubject<boolean>(
    this.getDarkModeEnabled()
  );
  isDarkModeEnabled$ = this.isDarkModeEnabled.asObservable();
}
