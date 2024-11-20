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
    this.route.queryParamMap.subscribe((params) => {
      this.token = params.get('token');
      console.log('Token:', this.token); // Logs the captured token
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { newPassword, confirmPassword } = this.resetPasswordForm.value;
      console.log(newPassword)
      console.log(confirmPassword)
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      // Call the AuthService to reset the password
      this.authService.resetPassword(newPassword, this.token).subscribe({
        next: () => {
          // On success, navigate to the login page
          alert('Password reset successful!');
          this.router.navigate(['/auth'], { queryParams: { mode: 'login' } });
        },
        error: (err) => {
          // Handle errors and display a message
          this.errorMessage = 'Failed to reset password. Please try again.';
        },
      });
    }
  }
}
