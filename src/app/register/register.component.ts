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
    { name: 'United States', dialCode: '+1', code: 'US' },
    { name: 'United Kingdom', dialCode: '+44', code: 'GB' },
    { name: 'France', dialCode: '+33', code: 'FR' },
    { name: 'Germany', dialCode: '+49', code: 'DE' },
    { name: 'Croatia', dialCode: '+385', code: 'HR' },
    { name: 'Canada', dialCode: '+1', code: 'CA' },
    { name: 'Australia', dialCode: '+61', code: 'AU' },
    { name: 'India', dialCode: '+91', code: 'IN' },
    { name: 'Japan', dialCode: '+81', code: 'JP' },
    { name: 'China', dialCode: '+86', code: 'CN' },
    { name: 'Italy', dialCode: '+39', code: 'IT' },
    { name: 'Spain', dialCode: '+34', code: 'ES' },
    { name: 'Mexico', dialCode: '+52', code: 'MX' },
    { name: 'Brazil', dialCode: '+55', code: 'BR' },
    { name: 'South Africa', dialCode: '+27', code: 'ZA' },
    { name: 'New Zealand', dialCode: '+64', code: 'NZ' },
    { name: 'Russia', dialCode: '+7', code: 'RU' },
    { name: 'South Korea', dialCode: '+82', code: 'KR' },
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
      countryCode: [this.countries[0].code, Validators.required], // Default to the first country
      phone: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]], // 7-15 digits
      month: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]], // MM
      day: ['', [Validators.required, Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])$/)]], // DD
      year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]], // YYYY
      dob: ['', [Validators.required, this.validateAge]], // Combined DOB validation
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],     
    }, {
      validator: this.passwordMatchValidator, // Custom validator
    });
  }

  focusNext(event: Event, nextField: string, maxLength: number) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === maxLength) {
      const nextInput = document.getElementById(nextField) as HTMLInputElement;
      nextInput?.focus();
    }
  }

  validateDOB() {
    const month = this.registerForm.get('month')?.value;
    const day = this.registerForm.get('day')?.value;
    const year = this.registerForm.get('year')?.value;

    if (month && day && year) {
      const dob = `${year}-${month}-${day}`;
      this.registerForm.patchValue({ dob }); // Combine into dob field
      const isValid = this.registerForm.get('dob')?.valid;
      if (!isValid) {
        this.registerForm.get('dob')?.setErrors({ invalid: true });
      }
    }
  }
  
  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const userData = {
        fname: formData.firstName,
        lname: formData.lastName,
        email: formData.email,
        dob: formData.dob,
        country: formData.countryCode,
        phone: formData.phone,
        password: formData.password
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
