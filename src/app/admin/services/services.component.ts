import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  deleteService,
  getAllService,
} from '../../store/service/service.action';
import { AddServiceComponent } from '../add-service/add-service.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  imports: [AddServiceComponent, FormsModule, CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  constructor(
    private service: Store<{ service: any }>,
    private sanitizer: DomSanitizer
  ) {}
  services: any;
  toggleForm: boolean = false;
  serviceData:any;

  ngOnInit() {
    this.service.dispatch(getAllService());

    this.service
      .select((state: any) => state.service)
      .subscribe({
        next: (response) => {
          this.services = response.allService;
        },
      });
  }

  openAddService() {
    this.toggleForm = !this.toggleForm;
  }

  getAddServiceFlag(event: any) {
    this.toggleForm = event;
  }

  isImage(name: string): boolean {
    return /\.(jpg|jpeg|png)$/i.test(name);
  }

  isPDF(name: string): boolean {
    return /\.pdf$/i.test(name);
  }

  getSanitizedUrl(fileName: string): SafeResourceUrl {
    const url = 'http://localhost:5000/serviceUploadsImg/' + fileName;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  deleteEvent(id: any) {
    console.log(id,'id')
    if (!id) {
      Swal.fire('id is required to delete service');
      return;
    }

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
        this.service.dispatch(deleteService({ _id: id }));
        Swal.fire({
          title: 'Deleted!',
          text: 'Service has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  editService(service:any){
    this.serviceData = service;
    this.toggleForm = true;
  }
}
