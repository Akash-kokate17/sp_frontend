import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { SignUpService } from '../../services/signUp/sign-up.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private singUpService: SignUpService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
        ),
      ]),
    });
  }

  login(loginData: FormGroup) {
    loginData.value.email = loginData.value.email.toLowerCase();
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      Swal.fire('enter valid data');
      return;
    }
    this.singUpService.login(loginData.value).subscribe({
      next: (response: any) => {
        this.singUpService.set('user', response);
        Swal.fire(response.msg || 'login successfully');
        if (response.userPass) {
          this.loginForm.reset();
          this.router.navigate(['/verifyOtp']);
        }
      },
      error: (error: any) => {
        Swal.fire(error?.error?.msg || 'Login failed');
      },
    });
  }
}
