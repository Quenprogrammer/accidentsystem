import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {NgIf, NgForOf, AsyncPipe, DatePipe} from '@angular/common';
import { Firestore, collection, collectionData, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accidents-reports',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './accidents-reports.component.html',
  styleUrl: './accidents-reports.component.css'
})
export class AccidentsReportsComponent {
  private firestore = inject(Firestore);
  messageForm: FormGroup;

  // UI feedback
  submitting = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  // Observable for Firestore messages
  messages$: Observable<any[]>;

  constructor(private fb: FormBuilder) {
    this.messageForm = this.fb.group({
      email: ['admin'],
      phone: ['admin'],
      location: this.fb.group({
        state: ['unknown'],
        lga: [''],
        area: ['']
      }),
      message: ['']
    });

    const deliveryRef = collection(this.firestore, 'deliveryMessages');
    this.messages$ = collectionData(deliveryRef, { idField: 'id' });
  }


  onSubmit() {
    if (this.messageForm.invalid) {
      this.errorMessage = 'Please fill out all required fields.';
      this.successMessage = null;
      return;
    }

    this.submitting = true;
    this.successMessage = null;
    this.errorMessage = null;

    const formData = {
      ...this.messageForm.value,
      createdAt: serverTimestamp()
    };

    const collectionRef = collection(this.firestore, 'deliveryMessages');

    addDoc(collectionRef, formData)
      .then(() => {
        this.successMessage = 'Message submitted successfully!';
        this.messageForm.reset();
      })
      .catch((err) => {
        console.error(err);
        this.errorMessage = 'Submission failed. Try again.';
      })
      .finally(() => {
        this.submitting = false;
      });
  }
}
