import {
  Component, Input, signal, OnChanges, SimpleChanges
} from '@angular/core';
import {
  FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule
} from '@angular/forms';
import {
  Firestore, doc, getDoc, setDoc, updateDoc, collection, addDoc
} from '@angular/fire/firestore';
import {
  Storage, ref, uploadBytes, getDownloadURL
} from '@angular/fire/storage';
import { NgIf, NgForOf } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-document',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './add-document.component.html',
  styleUrl: './add-document.component.css'
})
export class AddDocumentComponent {
  @Input() name: string = '';
  @Input() type: string = 'document';
  @Input() docId: string = '';
  @Input() collection: string = 'accidents';
  fileForm!: FormGroup; // Declare first

  constructor(private fb: FormBuilder, private firestore: Firestore) {}

  ngOnInit() {
    // Now that fb is initialized, you can safely use it
    this.fileForm = this.fb.group({
      filename: ['', Validators.required],
      serverFileAddress: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.fileForm.valid) {
      const formData = this.fileForm.value;
      const data = {
        ...formData,
        type: this.type
      };


      const fileDocRef = doc(this.firestore, this.collection, this.docId);

      // ⬇️ This will create the document if it doesn't exist or update if it does
      await setDoc(fileDocRef, data, { merge: true });

      alert('File data successfully saved!');
      this.fileForm.reset();
    }

}}
