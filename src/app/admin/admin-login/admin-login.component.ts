import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { SignUpService } from '../../services/signUp/sign-up.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  adminLogin: FormGroup;
  constructor(private fb: FormBuilder,private http:HttpClient, private singUpS:SignUpService,private router:Router) {
    this.adminLogin = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  AdminLogin() {
    if(this.adminLogin.invalid){
      this.adminLogin.markAllAsTouched();
      return
    }
   const apiUrl = environment.apiUrl;
    this.http.post(`${apiUrl}/admin/adminLogin`,this.adminLogin.value).subscribe({
      next:((response:any)=>{
        this.singUpS.set('admin',response)
        this.router.navigate(['admin-verifyOtp'])
      }),
      error:((error)=>{
        Swal.fire(error.error.msg)
      })
    })
  }
}
