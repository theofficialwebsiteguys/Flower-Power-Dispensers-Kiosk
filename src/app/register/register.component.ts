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
  isFormTouched = false; // Tracks if any input has been entered

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
      dob: ['', [Validators.required]], // Combined DOB validation
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],     
    }, {
      validator: this.passwordMatchValidator, // Custom validator
    });
  }

  ngOnInit() {
    // Track changes in the form to determine if any input is entered
    this.registerForm.valueChanges.subscribe(() => {
      this.isFormTouched = true;
    });
    this.registerForm.get('month')?.valueChanges.subscribe(() => this.validateDOB());
    this.registerForm.get('day')?.valueChanges.subscribe(() => this.validateDOB());
    this.registerForm.get('year')?.valueChanges.subscribe(() => this.validateDOB());
  }


  
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
  
    this.loading = true;
    this.error = ''; // Clear previous error
  
    const formData = this.registerForm.value;
    const userData = {
      fname: formData.firstName,
      lname: formData.lastName,
      email: formData.email,
      dob: formData.dob,
      country: formData.countryCode,
      phone: formData.phone,
      password: formData.password,
    };
  
    this.authService.register(userData).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = this.getErrorMessage(err); // Set friendly error message
      },
    });
  }

  private getErrorMessage(err: any): string {
    if (err.status === 400) {
      return 'Invalid registration details. Please check your inputs.';
    } else if (err.status === 409) {
      return 'Email or phone number is already in use.';
    } else if (err.status === 500) {
      return 'Server error. Please try again later.';
    }
    return 'An unexpected error occurred. Please try again.';
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

  validateDOB() {
    const month = this.registerForm.get('month')?.value;
    const day = this.registerForm.get('day')?.value;
    const year = this.registerForm.get('year')?.value;
  
    if (month && day && year) {
      const dob = `${year}-${month}-${day}`;
  
      // Validate if the date is valid and user is 18+
      const date = new Date(dob);
      if (isNaN(date.getTime())) {
        this.registerForm.get('dob')?.setErrors({ invalid: true });
        return;
      }
  
      const age = this.calculateAge(date);
      if (age < 18) {
        this.registerForm.get('dob')?.setErrors({ underage: true });
      } else {
        this.registerForm.get('dob')?.setErrors(null); // Clear errors if valid
      }
  
      this.registerForm.patchValue({ dob }); // Combine into dob field
    } else {
      // Reset errors if the fields are incomplete
      this.registerForm.get('dob')?.setErrors({ required: true });
    }
  }
  
  private calculateAge(dob: Date): number {
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();
  
    return monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
  }
  
}
