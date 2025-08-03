import { Component, EventEmitter, SimpleChanges } from '@angular/core';
import { service } from '../../store/service/service.reducer';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  modifyService,
  uploadService,
} from '../../store/service/service.action';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-service',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css',
  inputs: ['formToggle', 'editServiceData'],
  outputs: ['sendFlagToService'],
})
export class AddServiceComponent {
  formToggle: boolean = false;
  sendFlagToService = new EventEmitter();
  serviceForm: FormGroup;
  selectedFile: any;
  editServiceData: any;

  toggleFrom() {
    this.serviceForm.reset();
    this.selectedFile = null;
    this.editServiceData = null; // ✅ Reset edit state
    this.formToggle = !this.formToggle;
    this.sendFlagToService.emit(false);
  }

  constructor(private store: Store<{ service: any }>, private fb: FormBuilder) {
    this.serviceForm = this.fb.group({
      title: new FormControl('', [Validators['required']]),
      description: new FormControl('', [Validators['required']]),
      sharpyCount: new FormControl('', [Validators['required']]),
      ledScreenCount: new FormControl('', [Validators['required']]),
      price: new FormControl('', [Validators['required']]),
      btn: new FormControl('', [Validators['required']]),
      isActive: new FormControl('', [Validators['required']]),
      serviceImgUpload: new FormControl(''),
    });
  }

  addService() {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
    }
    const rawValue = this.serviceForm.value;

    const formData = new FormData();

    formData.append('title', rawValue.title);
    formData.append('description', rawValue.description);
    formData.append('btn', rawValue.btn);
    formData.append('price', rawValue.price);
    formData.append('isActive', rawValue.isActive);
    formData.append('sharpyCount', rawValue.sharpyCount);
    formData.append('ledScreenCount', rawValue.ledScreenCount);

    if (this.selectedFile) {
      formData.append('serviceImgUpload', this.selectedFile);
    }

    this.store.dispatch(uploadService({ formData: formData }));
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1],'check');
    }

    Swal.fire('service added successfully');
    this.serviceForm.reset();
  }

  handleInputFile(event: any) {
    const input = event.target;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(input.files, this.selectedFile, 'file');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editServiceData'] && this.editServiceData) {
      this.serviceForm.patchValue({
        title: this.editServiceData.title,
        description: this.editServiceData.description,
        sharpyCount: this.editServiceData.sharpyCount,
        ledScreenCount: this.editServiceData.ledScreenCount,
        price: this.editServiceData.price,
        btn: this.editServiceData.btn,
        isActive: this.editServiceData.isActive,
      });
    }
  }

  editService() {
    const rawValue = this.serviceForm.value;
    const formData = new FormData();

    formData.append('_id', this.editServiceData._id);
    formData.append('title', rawValue.title);
    formData.append('description', rawValue.description);
    formData.append('btn', rawValue.btn);
    formData.append('price', rawValue.price);
    formData.append('isActive', rawValue.isActive);
    formData.append('sharpyCount', rawValue.sharpyCount);
    formData.append('ledScreenCount', rawValue.ledScreenCount);

    // Only append image if user selected a new one
    if (this.selectedFile) {
      formData.append('serviceImgUpload', this.selectedFile);
    }

    this.store.dispatch(modifyService({ updatedData: formData }));
    Swal.fire('Service updated successfully');
    this.serviceForm.reset();
    this.sendFlagToService.emit(false);
  }
}
