import {Component, effect, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {AccidentSessionService} from '../../../accident-session.service';

@Component({
  selector: 'app-add-suspects',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './add-suspects.component.html',
  styleUrl: './add-suspects.component.css'
})
export class AddSuspectsComponent {
  private session = inject(AccidentSessionService);
  accidentId = this.session.accidentId;

  suspectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    effect(() => {
      const id = this.accidentId();
      if (id) {
        console.log('Accident ID is now available:', id);
      }
    });
    this.suspectForm = this.fb.group({
      suspects: this.fb.array([this.createSuspect()])
    });
  }

  get suspects(): FormArray {
    return this.suspectForm.get('suspects') as FormArray;
  }

  createSuspect(): FormGroup {
    return this.fb.group({
      fullName: ['', Validators.required],
      gender: [''],
      age: [''],
      address: [''],
      contact: [''],
      description: [''],
      additionalDetails: this.fb.array([this.createDetail()])
    });
  }

  createDetail(): FormGroup {
    return this.fb.group({
      label: [''],
      value: ['']
    });
  }

  addSuspect(): void {
    this.suspects.push(this.createSuspect());
  }

  removeSuspect(index: number): void {
    if (this.suspects.length > 1) {
      this.suspects.removeAt(index);
    }
  }

  getAdditionalDetails(suspectIndex: number): FormArray {
    return (this.suspects.at(suspectIndex).get('additionalDetails') as FormArray);
  }

  addDetail(suspectIndex: number): void {
    this.getAdditionalDetails(suspectIndex).push(this.createDetail());
  }

  removeDetail(suspectIndex: number, detailIndex: number): void {
    const detailsArray = this.getAdditionalDetails(suspectIndex);
    if (detailsArray.length > 1) {
      detailsArray.removeAt(detailIndex);
    }
  }

  onSubmit(): void {
    if (this.suspectForm.valid) {
      console.log(this.suspectForm.value);
      // Send to backend or Firestore
    }
  }
}
