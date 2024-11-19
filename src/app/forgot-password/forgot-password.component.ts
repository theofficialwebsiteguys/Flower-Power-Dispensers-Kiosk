import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  emailSent = false; // Flag to toggle between form and success message
  errorMessage = ''; // Store error message to display

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;

      // Call the AuthService to reset the password
      this.authService.sendPasswordReset(email).subscribe({
        next: () => {
          this.emailSent = true; // Show confirmation message
          this.errorMessage = ''; // Clear any previous error message
        },
        error: (err) => {
          if (err.status === 404) {
            this.errorMessage = 'The email is not associated with a registered account.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        },
      });
    }
  }

}
