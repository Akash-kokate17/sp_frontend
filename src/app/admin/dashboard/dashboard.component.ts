import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js/auto';
import { getAllEventOrder } from '../../store/event/event.action';
import { fetchAllRenOrder } from '../../store/rent/rent.action';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [],
})
export class DashboardComponent {
  rentOrder: any;
  eventOrder: any;
  allEventStatusCount: any = {};
  allRentStatusCount: any = {};

  @ViewChild('pieChart') pie: any;
  @ViewChild('myPieChart') rentCanvas: any;
  chart: any;

  constructor(
    private event: Store<{ event: any }>,
    private rent: Store<{ rent: any }>
  ) {}

  ngOnInit() {
    this.event.dispatch(getAllEventOrder());
    this.rent.dispatch(fetchAllRenOrder());

    this.event
      .select((state) => state.event)
      .subscribe({
        next: (response) => {
          this.eventOrder = response.allEventOrder;
          this.getAllEventCount();
        },
        error: () => Swal.fire('Something went wrong to show chart'),
      });

    this.rent
      .select((state) => state.rent)
      .subscribe({
        next: (response) => {
          this.rentOrder = response.allRentOrder;
          this.getAllRentOrder();
        },
        error: () => Swal.fire('Something went wrong to show chart'),
      });
  }

  getAllEventCount() {
    if (!this.eventOrder) return;

    const eventOrder = [...this.eventOrder];

    const statusCount: any = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    };

    eventOrder.forEach((order) => {
      const status = order.status?.toLowerCase();
      if (statusCount[status] !== undefined) {
        statusCount[status]++;
      }
    });

    this.allEventStatusCount = statusCount;

    this.renderChart();
  }

  getAllRentOrder() {
    if (!this.rentOrder) return;
    let rentOrder = [...this.rentOrder];

    let allStatusCount: any = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    };

    rentOrder.forEach((order: any) => {
      const status = order.status?.toLowerCase();
      allStatusCount[status] = (allStatusCount[status] || 0) + 1;
    });

    this.allRentStatusCount = allStatusCount;

    this.renderRentChart();
  }

  renderRentChart() {
    if (!this.rentCanvas || !this.rentCanvas.nativeElement) return;

    const ctx: any = this.rentCanvas.nativeElement.getContext('2d');
    const backgroundColors = ['#28a745', '#ffc107', '#17a2b8', '#dc3545'];

    const data = [
      this.allRentStatusCount.pending || 0,
      this.allRentStatusCount.confirmed || 0,
      this.allRentStatusCount.completed || 0,
      this.allRentStatusCount.cancelled || 0,
    ];

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    });
  }

  renderChart() {
    if (!this.pie || !this.pie.nativeElement) return;

    const ctx: any = this.pie.nativeElement.getContext('2d');

    const backgroundColors = ['#28a745', '#ffc107', '#17a2b8', '#dc3545'];

    const data = [
      this.allEventStatusCount.pending || 0,
      this.allEventStatusCount.confirmed || 0,
      this.allEventStatusCount.completed || 0,
      this.allEventStatusCount.cancelled || 0,
    ];

    if (this.chart) {
      this.chart.destroy(); // ✅ clean old chart if exists
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        datasets: [
          {
            data,
            backgroundColor: backgroundColors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    });
  }
}
