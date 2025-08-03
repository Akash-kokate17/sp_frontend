import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllService } from '../../store/service/service.action';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-service',
  imports: [CommonModule, FormsModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
})
export class ServiceComponent {
  constructor(private store: Store<{ service: any }>, private router: Router, private sanitizer: DomSanitizer) {}

  serviceData: any[] = [];

  ngOnInit() {
    this.store.dispatch(getAllService());

    this.store
      .select((state) => state.service)
      .subscribe({
        next: (response) => {
          this.serviceData = response.allService;
        },
      });
  }

  navToOrder(btnName: any) {
    this.router.navigate(['order',btnName]);
  }

   isImage(name: string): boolean {
    return /\.(jpg|jpeg|png)$/i.test(name);
  }

  isPDF(name: string): boolean {
    return /\.pdf$/i.test(name);
  }

  getSanitizedUrl(fileName: string): SafeResourceUrl {
    const url = 'https://sp-backend-uky8.onrender.com/serviceUploadsImg/' + fileName;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
