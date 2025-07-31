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
import { fileExtensionValidator } from '../../utils/invalidFile';
import { fileSizeValidator } from '../../utils/fileSize';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { RentMaterial } from '../../interface/rent-material';
import { SignUpService } from '../../services/signUp/sign-up.service';
import { rentOrderPlace } from '../../store/rent/rent.action';

@Component({
  selector: 'app-rent-event',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './rent-event.component.html',
  styleUrl: './rent-event.component.css',
})
export class RentEventComponent {
  areaName: string[] = [
    'Kothrud',
    'Hinjewadi',
    'Baner',
    'Wakad',
    'Aundh',
    'Hadapsar',
    'Viman Nagar',
    'Magarpatta',
    'Kharadi',
    'Swargate',
    'Camp',
    'Deccan Gymkhana',
    'Shivaji Nagar',
    'Yerwada',
    'Bavdhan',
    'Pimpri',
    'Chinchwad',
    'Kondhwa',
    'Bibwewadi',
    'Nigdi',
    'Dhankawadi',
    'Karve Nagar',
    'Parvati',
    'Lohegaon',
    'Sinhagad Road',
    'Warje',
    'Narhe',
    'Balewadi',
    'Manjri',
    'Pashan',
    'Dhanori',
    'Undri',
    'Talegaon',
    'Fursungi',
  ];

  numbers: number[] = [0, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  rentForm: FormGroup;
  userEmail: string = '';
  fileName: File | null = null;
  minDate: string = '';
  maxDate: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store<{ rent: any }>,
    private singUpService: SignUpService
  ) {
    const today = new Date();
    const max = new Date();
    max.setDate(today.getDate() + 30);

    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = max.toISOString().split('T')[0];

    this.userEmail = this.singUpService.get('user').email;

    this.rentForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+91[\-\s]?)?[6-9]\d{9}$/),
      ]),
      email: new FormControl(`${this.userEmail}`, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      address: new FormControl('', [Validators.required]),
      addressProofType: new FormControl('', [Validators.required]),
      sharpyLightCount: new FormControl('', [Validators.required]),
      ledScreenCount: new FormControl('', [Validators.required]),
      clientNote: new FormControl(''),
      rentDate: new FormControl('', [Validators.required]),
      fileName: new FormControl('', [
        Validators.required,
        fileExtensionValidator(['pdf', 'jpg', 'jpeg', 'png']),
        fileSizeValidator(5),
      ]),
    });
  }

  handleFileInput(e: any) {
    const input = e.target;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file;
      const fileControl = this.rentForm.get('fileName');
      fileControl?.markAsTouched();
      fileControl?.updateValueAndValidity();
    }
  }

  sendRentOrder() {
    if (this.rentForm.invalid) {
      this.rentForm.markAllAsTouched();
      Swal.fire('Fill all the required fields');
      return;
    }

    if (
      this.rentForm.get('sharpyLightCount')?.value == 0 &&
      this.rentForm.get('ledScreenCount')?.value == 0
    ) {
      Swal.fire(
        'Please select at least one Sharpy or LED count greater than 0'
      );
      return;
    }

    const formData = new FormData();

    if (this.rentForm.valid) {
      Object.entries(this.rentForm.value).forEach(([key, value]) => {
        if (key === 'fileName' && this.fileName) {
          formData.append(key, this.fileName);
        } else {
          formData.append(key, `${value}`);
        }
      });

      this.store.dispatch(rentOrderPlace({ rentOrder: formData }));
      this.rentForm.reset();
      Swal.fire('Order send successfully');
      const user = this.singUpService.get('user');
      if (user && user.email) {
        this.rentForm.get('email')?.setValue(user.email);
      }
    } else {
      Swal.fire('error to send rent order');
    }
  }
}
