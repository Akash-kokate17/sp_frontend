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
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { getEventUser, placeOrder } from '../../store/event/event.action';
import { getRentOrder } from '../../store/rent/rent.action';
import { SignUpService } from '../../services/signUp/sign-up.service';

@Component({
  selector: 'app-book-event',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './book-event.component.html',
  styleUrl: './book-event.component.css',
})
export class BookEventComponent {
  count: any[] = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  eventForm: any;
  userEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store<{ event: any }>,
    private singUpService: SignUpService
  ) {
    
    this.userEmail = this.singUpService.get('user').email;

    this.eventForm = this.fb.group({
      email: new FormControl(`${this.userEmail}`, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      phoneNo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+91[\-\s]?)?[6-9]\d{9}$/),
      ]),
      eventBookingDate: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
        ),
      ]),
      name: new FormControl('', [Validators.required]),
      eventType: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      clientMsg: new FormControl('', [Validators.required]),
      sharpyCount: new FormControl('', [Validators.required]),
      ledScreenCount: new FormControl('', [Validators.required]),
      serviceName: new FormControl('', [Validators.required]),
    });
  }

  sendEventOrder() {
    if (this.eventForm.invalid) {
      Swal.fire('Please fill all the required details');
      this.eventForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(placeOrder({ eventOrder: this.eventForm.value }));

    Swal.fire('Your order received successfully');
  }
}
