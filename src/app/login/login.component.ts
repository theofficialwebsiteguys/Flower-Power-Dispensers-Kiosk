import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
  
    if (this.loginForm.invalid) {
      return; // Exit early if the form is invalid
    }
  
    this.loading = true;
  
    // Build the login payload
    const loginPayload = {
      email: this.loginForm.get('email')?.value, // Retrieve email from form
      password: this.loginForm.get('password')?.value, // Retrieve password from form
    };
  
    // Call the AuthService's login method
    this.authService.login(loginPayload).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.loading = false;
        this.router.navigate(['/rewards']); // Redirect after successful login
      },
      error: (err) => {
        console.error('Login failed', err);
        this.loading = false;
        this.error = 'Login failed. Please check your credentials and try again.';
      },
    });
  }
  
}
