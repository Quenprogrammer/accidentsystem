import { Component, effect, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { AccidentSessionService } from '../../../accident-session.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.css'
})
export class AddLocationComponent {
  private session = inject(AccidentSessionService);
  private firestore = inject(Firestore);
  accidentId = this.session.accidentId;

  locationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    effect(() => {
      const id = this.accidentId();
      if (id) {
        console.log('Accident ID is now available:', id);
      }
    });

    this.locationForm = this.fb.group({
      locations: this.fb.array([this.createLocation()])
    });
  }

  get locations(): FormArray {
    return this.locationForm.get('locations') as FormArray;
  }

  createLocation(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      state: [''],
      lga: [''],
      description: ['']
    });
  }

  addLocation(): void {
    this.locations.push(this.createLocation());
  }

  removeLocation(index: number): void {
    if (this.locations.length > 1) {
      this.locations.removeAt(index);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.locationForm.valid) {
      const accidentId = this.accidentId();

      if (!accidentId) {
        console.error('No accident ID found');
        return;
      }

      const locations = this.locationForm.value.locations;

      try {
        const batchAdd = locations.map((location: any) => {
          const locRef = collection(this.firestore, `accidents/${accidentId}/locations`);
          return addDoc(locRef, location);
        });

        await Promise.all(batchAdd);
        console.log('All locations submitted to Firestore!');
        this.locationForm.reset();
        this.locations.clear();
        this.addLocation(); // reset to a single blank entry
      } catch (error) {
        console.error('Error submitting locations:', error);
      }
    } else {
      console.warn('Form is invalid');
    }
  }
}
