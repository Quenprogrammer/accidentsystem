import {Component, effect, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {AccidentSessionService} from '../../../accident-session.service';

@Component({
  selector: 'app-add-notes',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './add-notes.component.html',
  styleUrl: './add-notes.component.css'
})
export class AddNotesComponent {
  private session = inject(AccidentSessionService);
  accidentId = this.session.accidentId;


  form: FormGroup;

  constructor(private fb: FormBuilder) {
    effect(() => {
      const id = this.accidentId();
      if (id) {
        console.log('Accident ID is now available:', id);
      }
    });
    this.form = this.fb.group({
      notes: this.fb.array([this.fb.control('', Validators.required)]),
      additionalInfo: this.fb.control('', Validators.maxLength(1000))
    });
  }

  get notes(): FormArray {
    return this.form.get('notes') as FormArray;
  }

  addNote(): void {
    this.notes.push(this.fb.control('', Validators.required));
  }

  removeNote(index: number): void {
    this.notes.removeAt(index);
  }

  submit(): void {
    if (this.form.valid) {
      const payload = {
        notes: this.form.value.notes,
        additionalInfo: this.form.value.additionalInfo
      };
      console.log('Submitted Notes:', payload);
      // TODO: send to Firestore or external service
    } else {
      console.log('Form invalid');
    }
  }
}
