import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignUpService } from '../../services/signUp/sign-up.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css',
})
export class VerifyOtpComponent {
  otpInput: any;
  email: string = '';

  constructor(private signUpService: SignUpService, private router: Router) {}

  verifyOtp() {
    if (this.otpInput.length !== 4) {
      Swal.fire('Enter 4 digit otp');
      return;
    }
    const user = this.signUpService.get('user');
    if (!user || !user.email) {
      Swal.fire('User email not found');
      return;
    }
    this.email = user.email;

    const data = {
      email: this.email,
      otp: this.otpInput,
    };
    this.signUpService.verifyOtp(data).subscribe({
      next: (response: any) => {
        if (response.msg == 'OTP has expired. Please Login again.') {
          Swal.fire(response.msg);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
          return;
        }
        if (response.verified) {
          Swal.fire(response.msg);
          this.signUpService.set('otpVerified',response.verified)
          this.router.navigate(['/order']);
        } else {
          Swal.fire(response.msg || 'OTP not matched');
        }
      },
      error: (error: any) => {
        Swal.fire(error?.error?.msg || 'OTP verification failed');
      },
    });
  }
}
