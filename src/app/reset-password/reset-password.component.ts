import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AccessibilityService } from '../accessibility.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent  implements OnInit {

  resetPasswordForm: FormGroup;
  @Input() token: string | null = "";
  errorMessage: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly accessibilityService: AccessibilityService
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.token) {
      this.authService.validateResetToken(this.token).subscribe({
        next: (response) => {
          if (response.success) {
            console.log(response.message);
            this.accessibilityService.announce('Reset token validated successfully.', 'polite');
          } else {
            this.handleError('Invalid or expired reset token.');
          }
        },
        error: () => {
          this.handleError('Failed to validate the reset token. Please try again.');
        },
      });
    } else {
      this.handleError('Invalid or missing reset token.');
    }
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.accessibilityService.announce(message, 'assertive');
    this.router.navigateByUrl('/rewards'); // Redirecting to another page if error occurs
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.accessibilityService.announce(this.errorMessage, 'assertive');
      return;
    }

    const { newPassword, confirmPassword } = this.resetPasswordForm.value;

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Passwords do not match. Please try again.';
      this.accessibilityService.announce(this.errorMessage, 'assertive');
      return;
    }

    this.errorMessage = null; 
    this.authService.resetPassword(newPassword, this.token).subscribe({
      next: () => {
        this.accessibilityService.announce('Password reset successful!', 'polite');
        alert('Password reset successful!');
        this.router.navigate(['/auth'], { queryParams: { mode: 'login' } });
      },
      error: (err) => {
        this.errorMessage = this.getErrorMessage(err);
        this.accessibilityService.announce(this.errorMessage, 'assertive');
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
