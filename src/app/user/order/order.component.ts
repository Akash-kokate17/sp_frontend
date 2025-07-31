import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  selectedValue: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type');
    if (type === 'event') {
      this.selectedValue = 'bookEvent';
      this.router.navigate(['order/event/bookEvent']);
    } else if (type === 'rent') {
      this.selectedValue = 'rentMaterial';
      this.router.navigate(['order/rent/rentEvent']);
    }
  }

  handleInput(value: string) {
    this.selectedValue = value;

    const type = value === 'bookEvent' ? 'event' : 'rent';
    const path = value === 'bookEvent' ? 'bookEvent' : 'rentEvent';

    this.router.navigate([`/order/${type}/${path}`]);
  }
}
