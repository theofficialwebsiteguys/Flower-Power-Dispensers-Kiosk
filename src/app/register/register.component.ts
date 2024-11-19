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

  countries = [
    { name: 'United States', dialCode: '+1' },
    { name: 'United Kingdom', dialCode: '+44' },
    { name: 'France', dialCode: '+33' },
    { name: 'Germany', dialCode: '+49' },
    { name: 'Croatia', dialCode: '+385' },
    // Add more countries as needed
  ];

  selectedCountryCode = this.countries[0].dialCode; // Default country code

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      countryCode: [this.countries[0].dialCode, Validators.required], // Default to the first country
      phone: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]], // 7-15 digits
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

  onCountryCodeChange() {
    const countryCode = this.registerForm.get('countryCode')?.value;
    const phoneControl = this.registerForm.get('phone');
    if (phoneControl) {
      phoneControl.setValue(`${countryCode}${phoneControl.value || ''}`);
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
