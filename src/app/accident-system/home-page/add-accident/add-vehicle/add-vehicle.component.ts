import {Component, effect, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {AccidentSessionService} from '../../../accident-session.service';

@Component({
  selector: 'app-add-vehicle',
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent {
  vehicleForm: FormGroup;
  private session = inject(AccidentSessionService);
  accidentId = this.session.accidentId;

  constructor(private fb: FormBuilder) {
    effect(() => {
      const id = this.accidentId();
      if (id) {
        console.log('Accident ID is now available:', id);
      }
    });
    this.vehicleForm = this.fb.group({
      vehicles: this.fb.array([this.createVehicle()])
    });
  }

  get vehicles(): FormArray {
    return this.vehicleForm.get('vehicles') as FormArray;
  }

  createVehicle(): FormGroup {
    return this.fb.group({
      plateNumber: ['', Validators.required],
      type: ['', Validators.required],
      color: [''],
      manufacturer: [''],
      chassisNumber: [''],
      engineNumber: [''],
      year: [''],
      condition: [''],
      ownerName: [''],
      ownerContact: [''],
      description: ['']
    });
  }

  addVehicle(): void {
    this.vehicles.push(this.createVehicle());
  }

  removeVehicle(index: number): void {
    if (this.vehicles.length > 1) {
      this.vehicles.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      console.log(this.vehicleForm.value);
    }
  }
}
