import {Component, computed, inject, signal} from '@angular/core';
import {collection, collectionData, deleteDoc, doc, Firestore} from '@angular/fire/firestore';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-view-officers',
  imports: [
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './view-officers.html',
  styleUrl: './view-officers.css'
})
export class ViewOfficers {
  private firestore = inject(Firestore);
  officers = signal<any[]>([]);
  searchTerm: string = '';

  constructor() {
    const officersRef = collection(this.firestore, 'officers');
    collectionData(officersRef, { idField: 'id' }).subscribe(data => {
      this.officers.set(data);
    });
  }

  filteredOfficers = computed(() => {
    const search = this.searchTerm.toLowerCase();
    return this.officers().filter(officer =>
      Object.values(officer)
        .join(' ')
        .toLowerCase()
        .includes(search)
    );
  });

  async deleteOfficer(id: string) {
    if (confirm('Are you sure you want to delete this officer?')) {
      const docRef = doc(this.firestore, 'officers', id);
      await deleteDoc(docRef);
      alert('Officer deleted!');
    }
  }
}
