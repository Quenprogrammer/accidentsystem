import { Component } from '@angular/core';
import {addDoc, collection, Firestore } from '@angular/fire/firestore';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from '../../../core/header/header.component';

@Component({
  selector: 'app-add-suspect',
  imports: [
    ReactiveFormsModule,
    HeaderComponent
  ],
  template: `
    <div class="container p-4">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <div class="d-flex align-items-center flex-nowrap">
              <div class="me-3">
                <img src="fud.png" style="width: 60px; height: 60px;">
              </div>
              <div class="mt-2">
                <h1 class="page-header-title mb-0">Audu Bako College of Agriculture Danbatta</h1>
                <p style="font-size: 20px" class="  mb-0">Accident System</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="mb-3">Add Suspect</h2>
      <form [formGroup]="form" (ngSubmit)="submitForm()">
        <div class="mb-3">
          <label>First Name</label>
          <input class="form-control" formControlName="firstName">
        </div>
        <div class="mb-3">
          <label>Last Name</label>
          <input class="form-control" formControlName="lastName">
        </div>
        <div class="mb-3">
          <label>Age</label>
          <input type="number" class="form-control" formControlName="age">
        </div>
        <div class="mb-3">
          <label>Gender</label>
          <select class="form-select" formControlName="gender">
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div class="mb-3">
          <label>Address</label>
          <textarea class="form-control" formControlName="address"></textarea>
        </div>
        <div class="mb-3">
          <label>Crime Type</label>
          <input class="form-control" formControlName="crimeType">
        </div>
        <button class="btn btn-primary" type="submit" [disabled]="form.invalid">Submit</button>
      </form>

      <div *ngIf="successMessage" class="alert alert-success mt-3">
        {{ successMessage }}
      </div>
    </div>
  `,
  styleUrl: './add-suspect.css'
})
export class AddSuspect {
  form: FormGroup;
  successMessage = '';

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      crimeType: ['', Validators.required]
    });
  }

  async submitForm() {
    if (this.form.valid) {
      const suspectData = this.form.value;
      try {
        await addDoc(collection(this.firestore, 'suspects'), suspectData);
        this.successMessage = 'Suspect added successfully.';
        this.form.reset();
      } catch (error) {
        console.error('Error adding suspect:', error);
        this.successMessage = 'Failed to add suspect.';
      }
    }
  }
}
