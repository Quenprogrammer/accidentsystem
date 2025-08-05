import { Component } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-officres',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-officres.html',
  styleUrl: './add-officres.css'
})
export class AddOfficres {
  officerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private router: Router
  ) {
    this.officerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      rank: ['', Validators.required],
      badgeNumber: ['', Validators.required],
      station: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async submitForm() {
    if (this.officerForm.valid) {
      const officersRef = collection(this.firestore, 'officers');
      await addDoc(officersRef, this.officerForm.value);
      alert('Officer added successfully!');
      this.officerForm.reset();
      this.router.navigate(['/view-officers']); // optional
    }
  }
}
