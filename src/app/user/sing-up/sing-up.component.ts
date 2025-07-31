import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { passwordValidator } from '../../utils/passwordValidator';
import { matchPassword } from '../../utils/passwordMatch';
import { SignUpService } from '../../services/signUp/sign-up.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css',
})
export class SingUpComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private signUpService: SignUpService,private router:Router) {
    this.signUpForm = this.fb.group(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ]),
        phoneNo: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/),
          Validators.maxLength(10),
          Validators.minLength(10),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
          ),
          passwordValidator(),
        ]),
        cnfPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: matchPassword('password', 'cnfPassword'),
      }
    );
  }

  signUp(form: any) {
    console.log(form.value);
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      Swal.fire({
        title: '',
        icon: 'success',
        draggable: true,
      });
      Swal.fire('plz fill all field correctly');
      return;
    }
    this.signUpService.singUp(this.signUpForm.value).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: response.msg,
          text: response.msg,
          confirmButtonColor: '#3085d6',
        });
        this.signUpForm.reset();
        this.router.navigate(['/login'])
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: error?.error?.msg || 'Something went wrong during signup.',
          confirmButtonColor: '#d33',
        });
      },
    });
  }
}
