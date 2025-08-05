import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-add-witness',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './add-witness.component.html',
  styleUrl: './add-witness.component.css'
})
export class AddWitnessComponent {
  witnessForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.witnessForm = this.fb.group({
      witnesses: this.fb.array([this.createWitness()])
    });
  }

  get witnesses(): FormArray {
    return this.witnessForm.get('witnesses') as FormArray;
  }

  createWitness(): FormGroup {
    return this.fb.group({
      fullName: ['', Validators.required],
      gender: [''],
      age: [''],
      address: [''],
      contact: [''],
      testimony: [''],
      additionalDetails: this.fb.array([this.createDetail()])
    });
  }

  createDetail(): FormGroup {
    return this.fb.group({
      label: [''],
      value: ['']
    });
  }

  addWitness(): void {
    this.witnesses.push(this.createWitness());
  }

  removeWitness(index: number): void {
    if (this.witnesses.length > 1) {
      this.witnesses.removeAt(index);
    }
  }

  getAdditionalDetails(witnessIndex: number): FormArray {
    return this.witnesses.at(witnessIndex).get('additionalDetails') as FormArray;
  }

  addDetail(witnessIndex: number): void {
    this.getAdditionalDetails(witnessIndex).push(this.createDetail());
  }

  removeDetail(witnessIndex: number, detailIndex: number): void {
    const detailsArray = this.getAdditionalDetails(witnessIndex);
    if (detailsArray.length > 1) {
      detailsArray.removeAt(detailIndex);
    }
  }

  onSubmit(): void {
    if (this.witnessForm.valid) {
      console.log(this.witnessForm.value);
      // Send to backend or Firestore
    }
  }
}
