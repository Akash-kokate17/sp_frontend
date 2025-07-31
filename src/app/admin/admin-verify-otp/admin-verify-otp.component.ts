import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SignUpService } from '../../services/signUp/sign-up.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-verify-otp',
  imports: [FormsModule],
  templateUrl: './admin-verify-otp.component.html',
  styleUrl: './admin-verify-otp.component.css',
})
export class AdminVerifyOtpComponent {
  constructor(
    private http: HttpClient,
    private singUps: SignUpService,
    private router: Router
  ) {}

  otpInput: any;

  verifyOtp() {
    const apiUrl = environment.apiUrl;
    const email = this.singUps.get('admin').email;
    if (this.otpInput.length != 4) {
      Swal.fire('enter 4 digit otp');
      return;
    }
    this.http
      .post(`${apiUrl}/admin/adminVerifyOtp`, {
        email: email,
        otp: this.otpInput,
      })
      .subscribe({
        next: (response: any) => {
          if (response.admin) {
            this.singUps.set('adminVerify',response.admin)
            this.router.navigate(['admin/dashboard']);
          }
        },
        error: (error) => {
          Swal.fire(error.error.msg);
          if (error.error.otpExpires) {
            setTimeout(() => {
              this.router.navigate(['adminLogin']);
            }, 1000);
          }
        },
      });
  }
}
