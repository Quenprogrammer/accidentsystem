import { Component } from '@angular/core';
import {collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-suspects',
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './suspects.component.html',
  styleUrl: './suspects.component.css'
})
export class SuspectsComponent {
  suspects: any[] = [];
  searchTerm: string = '';

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const suspectsCollection = collection(this.firestore, 'suspects');
    collectionData(suspectsCollection, { idField: 'id' }).subscribe((data) => {
      this.suspects = data;
    });
  }

  filteredSuspects() {
    if (!this.searchTerm) return this.suspects;
    const term = this.searchTerm.toLowerCase();
    return this.suspects.filter(suspect =>
      `${suspect.firstName} ${suspect.lastName}`.toLowerCase().includes(term) ||
      suspect.crimeType?.toLowerCase().includes(term) ||
      suspect.gender?.toLowerCase().includes(term) ||
      suspect.address?.toLowerCase().includes(term)
    );
  }

  async deleteSuspect(id: string) {
    if (confirm('Are you sure you want to delete this suspect?')) {
      const suspectDoc = doc(this.firestore, `suspects/${id}`);
      await deleteDoc(suspectDoc);
    }
  }
}
