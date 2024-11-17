import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent  implements OnInit {

  resetPasswordForm: FormGroup;
  token: string | null = "";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { password, confirmPassword } = this.resetPasswordForm.value;
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      this.http
        .post(`http://your-api-url/api/reset-password/${this.token}`, { password })
        .subscribe({
          next: () => alert('Password reset successfully'),
          error: (err) => alert('Error: ' + err.message),
        });
    }
  }
}
