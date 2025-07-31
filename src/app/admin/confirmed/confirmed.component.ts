import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { fetchAllRenOrder, updateRentOrder } from '../../store/rent/rent.action';
import { getAllEventOrder, updateEventStatus } from '../../store/event/event.action';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmed',
  imports: [CommonModule,FormsModule],
  templateUrl: './confirmed.component.html',
  styleUrl: './confirmed.component.css'
})
export class ConfirmedComponent {
eventOrder: any;
  rentOrder: any;
  renderOrder: any;
  selectStatus: string = '';
  selectEvent: any;
  flag: boolean = false;
  selectedTypeValue = 'event';

  constructor(
    private eventStore: Store<{ event: any }>,
    private rentStore: Store<{ rent: any }>
  ) {}

  ngOnInit() {
    this.eventStore.dispatch(getAllEventOrder());
    this.rentStore.dispatch(fetchAllRenOrder());

    this.eventStore
      .select((state) => state.event)
      .subscribe({
        next: (response) => {
          this.eventOrder = response.allEventOrder;
          this.findPendingOrderEvent();
        },
        error: (error) => {
          console.log(error);
        },
      });

    this.rentStore
      .select((state) => state.rent)
      .subscribe({
        next: (response) => {
          this.rentOrder = response.allRentOrder;
          this.findPendingOrderRent();
        },
        error: (error) => {
          Swal.fire('error to get rent order');
          console.log(error, 'error');
        },
      });
  }

  findPendingOrderEvent() {
    this.eventOrder = this.eventOrder.filter((event: any) => {
      return event?.status?.toLowerCase() === 'confirmed';
    });
    this.renderOrder = this.eventOrder;
  }

  findPendingOrderRent() {
    this.rentOrder = this.rentOrder.filter((rent: any) => {
      return rent?.status?.toLowerCase() === 'confirmed';
    });
  }

  updateStatusEvent(event: any) {
    this.selectEvent = event;
    this.flag = true;
  }

  updateStatus() {
    if (!this.selectStatus) {
      Swal.fire('Please select a status to update');
      return;
    }

    if (this.selectStatus === this.selectEvent.status) {
      Swal.fire('You are trying to update the same status');
      return;
    }

    if (this.selectedTypeValue === 'event') {
      this.eventStore.dispatch(
        updateEventStatus({
          _id: this.selectEvent._id,
          status: this.selectStatus,
        })
      );
      this.eventStore.dispatch(getAllEventOrder());
      setTimeout(() => this.findPendingOrderEvent(), 300);
    } else if (this.selectedTypeValue === 'rent') {
      this.rentStore.dispatch(
        updateRentOrder({
          _id: this.selectEvent._id,
          status: this.selectStatus,
        })
      );
      this.rentStore.dispatch(fetchAllRenOrder());
      setTimeout(() => {
        this.findPendingOrderRent();
        this.renderOrder = this.rentOrder
      }, 1000);
    }

    Swal.fire('Status updated successfully');
    this.flag = false;
  }

  toggleCard() {
    this.flag = !this.flag;
  }

  selectedType(event: any) {
    this.selectedTypeValue = event.target.value;
    this.renderOrder =
      this.selectedTypeValue === 'event' ? this.eventOrder : this.rentOrder;
  }
}
