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
@Component({
  selector: 'app-add-video',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './add-video.component.html',
  styleUrl: './add-video.component.css'
})
export class AddVideoComponent {
  videoForm: FormGroup;
  isUploading = signal(false);
  uploadSuccess = signal(false);
  uploadError = signal<string | null>(null);
  fileMap = new Map<number, File>();

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private storage: Storage
  ) {
    this.videoForm = this.fb.group({
      videos: this.fb.array([])
    });
    this.addVideo(); // Add first entry by default
  }

  get videos(): FormArray {
    return this.videoForm.get('videos') as FormArray;
  }

  addVideo() {
    const group = this.fb.group({
      description: ['', Validators.required]
    });
    this.videos.push(group);
  }

  removeVideo(index: number) {
    this.videos.removeAt(index);
    this.fileMap.delete(index);
  }

  onFileChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type.startsWith('video/')) {
      this.fileMap.set(index, file);
    } else {
      alert('Please select a valid video file.');
    }
  }

  async uploadVideos() {
    if (this.videoForm.invalid || this.videos.length === 0) {
      this.uploadError.set('Please fill out all descriptions and upload files.');
      return;
    }

    this.isUploading.set(true);
    this.uploadError.set(null);
    this.uploadSuccess.set(false);

    const videoCollection = collection(this.firestore, 'uploadedVideos');
    const uploaded: any[] = [];

    try {
      for (let i = 0; i < this.videos.length; i++) {
        const formGroup = this.videos.at(i);
        const description = formGroup.value.description;
        const file = this.fileMap.get(i);

        if (!file) throw new Error(`No video file selected for entry ${i + 1}`);

        const path = `videos/${Date.now()}_${file.name}`;
        const fileRef = ref(this.storage, path);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);

        const videoData = {
          description,
          videoUrl: downloadURL,
          fileName: file.name,
          uploadedAt: new Date()
        };

        await addDoc(videoCollection, videoData);
        uploaded.push(videoData);
      }

      this.videoForm.reset();
      this.videos.clear();
      this.fileMap.clear();
      this.addVideo(); // reset with one field
      this.uploadSuccess.set(true);
    } catch (err: any) {
      this.uploadError.set(err.message || 'Upload failed');
    } finally {
      this.isUploading.set(false);
    }
  }
}
