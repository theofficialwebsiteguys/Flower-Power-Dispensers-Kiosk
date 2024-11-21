import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent  implements OnInit {

  resetPasswordForm: FormGroup;
  token: string | null = "";
  errorMessage: string | null = null; // For error messages

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // Get the token from the query parameters
    this.route.queryParamMap.subscribe((params) => {
      this.token = params.get('token');

      if (this.token) {
        // Validate the token with the backend
        this.authService.validateResetToken(this.token).subscribe({
          next: (response) => {
            if (!response.valid) {
              this.errorMessage = 'Invalid or expired reset token.';
              this.router.navigateByUrl('/rewards');
            }
          },
          error: () => {
            this.errorMessage = 'Failed to validate the reset token. Please try again.';
            this.router.navigateByUrl('/rewards');
          },
        });
      } else {
        this.errorMessage = 'Invalid or missing reset token.';
        this.router.navigateByUrl('/rewards');
      }
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const { newPassword, confirmPassword } = this.resetPasswordForm.value;

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Passwords do not match. Please try again.';
      return;
    }

    // Call the AuthService to reset the password
    this.errorMessage = null; // Clear previous errors
    this.authService.resetPassword(newPassword, this.token).subscribe({
      next: () => {
        alert('Password reset successful!');
        this.router.navigate(['/auth'], { queryParams: { mode: 'login' } });
      },
      error: (err) => {
        this.errorMessage = this.getErrorMessage(err);
      },
    });
  }

  private getErrorMessage(err: any): string {
    if (err.status === 400) {
      return 'The reset token is invalid or expired. Please request a new reset link.';
    } else if (err.status === 500) {
      return 'An error occurred on the server. Please try again later.';
    }
    return 'An unexpected error occurred. Please try again.';
  }
}
