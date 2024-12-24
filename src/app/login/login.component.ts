import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  darkModeEnabled: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly settingsService: SettingsService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.settingsService.isDarkModeEnabled$.subscribe(mode => this.darkModeEnabled = mode);
  }

  ngOnDestroy() {
    this.resetForm();
  }

  resetForm() {
    this.loginForm.reset(); // Reset the form fields
    this.submitted = false; // Reset submission state
    this.error = ''; // Clear any errors
    this.loading = false;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }

    this.loading = true;
    this.error = ''; 

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.resetForm();
        this.router.navigate(['/rewards'])
      },
      error: (err) => {
        this.loading = false;
        this.error = this.getErrorMessage(err);
      },
    });
  }

  private getErrorMessage(err: any): string {
    if (err.status === 400) return 'Invalid email or password. Please try again.';
    if (err.status === 500) return 'Server error. Please try again later.';
    if (err.status === 0) return 'Network error. Please check your internet connection.';
    return 'An unexpected error occurred. Please try again.';
  }
}
