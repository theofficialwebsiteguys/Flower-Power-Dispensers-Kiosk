import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {


  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dob: ['', [Validators.required, this.validateAge]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: this.passwordMatchValidator, // Custom validator
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const userData = {
        fname: formData.firstName,
        lname: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };
  
      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
        },
        error: (err) => {
          console.error('Registration failed:', err);
        }
      });
    }
  }

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  validateAge(control: any): { [key: string]: boolean } | null {
    const dob = new Date(control.value);
    const ageDiffMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age >= 18 ? null : { underage: true }; // Must be 18+
  }
}
