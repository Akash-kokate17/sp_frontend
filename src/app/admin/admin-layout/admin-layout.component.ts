import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from "../admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminNavbarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
