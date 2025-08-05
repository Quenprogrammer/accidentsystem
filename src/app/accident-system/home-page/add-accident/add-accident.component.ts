import { Component, OnInit, signal } from '@angular/core';
import { NgComponentOutlet, NgForOf, NgIf } from '@angular/common';
import { AddLocationComponent } from './add-location/add-location.component';
import { AddWitnessComponent } from './add-witness/add-witness.component';
import { AddSuspectsComponent } from './add-suspects/add-suspects.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StatisticsService } from './statistics.service';
import { Firestore, addDoc, collection, doc, updateDoc } from '@angular/fire/firestore';
import { AccidentSessionService } from '../../accident-session.service';

@Component({
  selector: 'app-add-accident',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    NgComponentOutlet,
    AddLocationComponent,
    AddWitnessComponent,
    AddSuspectsComponent,
    AddVehicleComponent,
    AddNotesComponent,
    AddDocumentComponent,
  ],
  templateUrl: './add-accident.component.html',
  styleUrl: './add-accident.component.css',
})
export class AddAccidentComponent implements OnInit {
  accidentUploadSections = [
    { label: 'Add images', icon: 'FIRS/accidentsMenu/image-square-svgrepo-com.svg' },
    { label: 'Add audio footage', icon: 'FIRS/accidentsMenu/audio-square-svgrepo-com.svg' },
    { label: 'Add video footage', icon: 'FIRS/accidentsMenu/video-svgrepo-com.svg' },
    { label: 'Add document', icon: 'FIRS/accidentsMenu/document-svgrepo-com.svg', component: AddDocumentComponent },
    { label: 'Additional Notes', icon: 'FIRS/accidentsMenu/notes-record-stationery-svgrepo-com.svg', component: AddNotesComponent },
    { label: 'Add suspects', icon: 'FIRS/accidentsMenu/arrest-svgrepo-com.svg', component: AddSuspectsComponent },
    { label: 'Add witness', icon: 'FIRS/accidentsMenu/witness-law-svgrepo-com.svg', component: AddWitnessComponent },
    { label: 'Add Locations', icon: 'FIRS/accidentsMenu/location-pin-svgrepo-com.svg', component: AddLocationComponent },
    { label: 'Add Vehicles', icon: 'FIRS/accidentsMenu/car-svgrepo-com.svg', component: AddVehicleComponent }
  ];

  isModal2Open = signal(false);
  selectedComponent = signal<any>(null);
  form!: FormGroup;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private statsService: StatisticsService,
    private firestore: Firestore,
    private session: AccidentSessionService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      accidents: this.fb.array([this.createAccidentGroup()])
    });

    this.createEmptyAccidentDoc();
  }

  get accidents(): FormArray {
    return this.form.get('accidents') as FormArray;
  }

  createAccidentGroup(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      phone: [''],
      organization: [''],
      department: [''],
      userAccountTypeRadio: [''],
      gender: [''],
      vehicle: [''],
      state: [''],
      moneyLost: [''],
      ageRange: [''],
      city: [''],
      message: ['']
    });
  }

  addAccident(): void {
    this.accidents.push(this.createAccidentGroup());
  }

  removeAccident(index: number): void {
    this.accidents.removeAt(index);
  }

  async createEmptyAccidentDoc(): Promise<void> {
    try {
      const ref = await addDoc(collection(this.firestore, 'accidents'), {
        createdAt: new Date(),
        status: 'in-progress'
      });
      this.session.accidentId.set(ref.id);
      console.log('Created initial accident document with ID:', ref.id);
    } catch (error) {
      console.error('Failed to create accident document:', error);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const payload = this.form.value.accidents;

    const docId = this.session.accidentId(); // get signal value
    if (!docId) {
      console.error('No accident document ID found.');
      return;
    }

    const accidentDocRef = doc(this.firestore, 'accidents', docId);

    try {
      await updateDoc(accidentDocRef, {
        details: payload,
        updatedAt: new Date()
      });

      for (const entry of payload) {
        if (entry.userAccountTypeRadio === 'death') {
          this.statsService.increment('death');
        } else if (entry.userAccountTypeRadio === 'injury') {
          this.statsService.increment('injury');
        }

        if (entry.gender === 'Male') {
          this.statsService.increment('male');
        } else if (entry.gender === 'Female') {
          this.statsService.increment('female');
        }

        if (entry.vehicle) {
          const vehicleKey = entry.vehicle.toLowerCase().replace(/\s+/g, '_');
          this.statsService.increment(`vehicle_${vehicleKey}`);
        }

        if (entry.state) {
          const stateKey = entry.state.toLowerCase().replace(/\s+/g, '_');
          this.statsService.increment(`accident_state_${stateKey}`);
          this.statsService.increment(`state_${stateKey}`);

          const money = parseFloat(entry.moneyLost);
          if (!isNaN(money) && money > 0) {
            this.statsService.incrementAmount(`money_state_${stateKey}`, money);
          }
        }
      }

      this.countVisit();
      this.form.reset();
      this.accidents.clear();
      this.addAccident();
      this.successMessage = 'Submission successful!';
      setTimeout(() => (this.successMessage = ''), 3000);
    } catch (error) {
      console.error('Error updating accident document:', error);
    }
  }

  countVisit() {
    this.statsService.increment('visits');
    this.statsService.increment('shares');
  }

  openModalWith(component: any) {
    this.selectedComponent.set(component);
    this.isModal2Open.set(true);
  }

  closeModal() {
    this.isModal2Open.set(false);
    this.selectedComponent.set(null);
  }
}
