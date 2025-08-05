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
import {AddDocumentComponent} from '../add-document/add-document.component';
@Component({
  selector: 'app-add-audio',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    AddDocumentComponent
  ],
  templateUrl: './add-audio.component.html',
  styleUrl: './add-audio.component.css'
})
export class AddAudioComponent {
  audioForm: FormGroup;
  isUploading = signal(false);
  uploadSuccess = signal(false);
  uploadError = signal<string | null>(null);
  fileMap = new Map<number, File>();

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private storage: Storage
  ) {
    this.audioForm = this.fb.group({
      audios: this.fb.array([])
    });
    this.addAudio(); // Add one audio entry by default
  }

  get audios(): FormArray {
    return this.audioForm.get('audios') as FormArray;
  }

  addAudio() {
    const group = this.fb.group({
      description: ['', Validators.required]
    });
    this.audios.push(group);
  }

  removeAudio(index: number) {
    this.audios.removeAt(index);
    this.fileMap.delete(index);
  }

  onFileChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      this.fileMap.set(index, file);
    } else {
      alert('Please select a valid audio file.');
    }
  }

  async uploadAudios() {
    if (this.audioForm.invalid || this.audios.length === 0) {
      this.uploadError.set('Please fill out all descriptions and upload files.');
      return;
    }

    this.isUploading.set(true);
    this.uploadError.set(null);
    this.uploadSuccess.set(false);

    const audioCollection = collection(this.firestore, 'uploadedAudios');
    const uploaded: any[] = [];

    try {
      for (let i = 0; i < this.audios.length; i++) {
        const formGroup = this.audios.at(i);
        const description = formGroup.value.description;
        const file = this.fileMap.get(i);

        if (!file) throw new Error(`No audio file selected for entry ${i + 1}`);

        const path = `audios/${Date.now()}_${file.name}`;
        const fileRef = ref(this.storage, path);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);

        const audioData = {
          description,
          audioUrl: downloadURL,
          fileName: file.name,
          uploadedAt: new Date()
        };

        await addDoc(audioCollection, audioData);
        uploaded.push(audioData);
      }

      this.audioForm.reset();
      this.audios.clear();
      this.fileMap.clear();
      this.addAudio(); // reset with one field
      this.uploadSuccess.set(true);
    } catch (err: any) {
      this.uploadError.set(err.message || 'Upload failed');
    } finally {
      this.isUploading.set(false);
    }
  }
}
