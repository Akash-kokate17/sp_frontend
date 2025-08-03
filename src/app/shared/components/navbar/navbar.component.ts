import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SignUpService } from '../../../services/signUp/sign-up.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  flag: boolean = false;
  constructor(private router: Router, private singUpS: SignUpService) {}

  handleSingUpAndLogin() {
    const user = this.singUpS.get('otpVerified');
    if (user) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to logout',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout',
      }).then((result) => {
        if (result.isConfirmed) {
          this.flag = false;
          localStorage.removeItem('otpVerified');
          Swal.fire({
            title: 'logout',
            text: 'logout successfully',
            icon: 'success',
          });
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  handleRouting(e: any) {
    const value = e.target.value;

    switch (value) {
      case 'gallery':
      case 'help':
        this.router.navigate([`/${value}`]);
        break;

      case 'admin':
        this.handleAminRoute();
        break;

      case 'signupOrLogout':
        this.handleSingUpAndLogin();
        break;

      default:
        break;
    }
  }

  ngOnInit() {
    const userLogin = this.singUpS.get('otpVerified');
    if (userLogin) {
      this.flag = true;
    }
  }

  handleAminRoute() {
    const admin = this.singUpS.get('adminVerify');
    if (admin) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/adminLogin']);
    }
  }

  handleOrderRoute() {
    const user = this.singUpS.get('otpVerified');
    if (user) {
      this.router.navigate(['/order']);
    } else {
      Swal.fire('you have to login for give a order');
    }
  }
}
