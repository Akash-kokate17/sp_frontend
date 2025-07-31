import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignUpService } from '../../services/signUp/sign-up.service';
import { RentMaterial } from '../../interface/rent-material';
import { Store } from '@ngrx/store';
import { Event } from '../../interface/event';
import {
  getEventUser,
  updateEventStatus,
} from '../../store/event/event.action';
import { getRentOrder, updateRentOrder } from '../../store/rent/rent.action';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.css',
})
export class UserOrderComponent {
  constructor(
    private singUpService: SignUpService,
    private eventStore: Store<{ event: any }>,
    private rentStore: Store<{ rent: any }>
  ) {}
  allOrder: any[] = [];
  eventOrder: Event[] = [];
  rentOrder: RentMaterial[] = [];

  ngOnInit() {
    const email = this.singUpService.get('user').email;

    this.eventStore.dispatch(getEventUser({ email: email }));
    this.rentStore.dispatch(getRentOrder({ email: email }));

    this.rentStore
      .select((state) => state.rent)
      .subscribe({
        next: (response) => {
          this.rentOrder = response.rentOrderUser;
          this.mergeAllOrder();
        },
      });

    this.eventStore
      .select((state) => state.event)
      .subscribe({
        next: (response) => {
          this.eventOrder = response.eventOrder;
          this.mergeAllOrder();
        },
      });
  }
  mergeAllOrder() {
    this.allOrder = [...this.eventOrder, ...this.rentOrder];
  }

  cancelOrder(order: any) {
    if (order.eventType) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.eventStore.dispatch(
            updateEventStatus({ status: 'Cancelled', _id: order._id })
          );
          Swal.fire({
            title: 'Deleted!',
            text: 'Your order is cancelled',
            icon: 'success',
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.rentStore.dispatch(
            updateRentOrder({ _id: order._id, status: 'Cancelled' })
          );
          Swal.fire({
            title: 'Deleted!',
            text: 'Your order is cancelled',
            icon: 'success',
          });
        }
      });
    }
  }
}
