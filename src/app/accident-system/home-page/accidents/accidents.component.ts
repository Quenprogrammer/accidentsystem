import {Component, computed, inject, signal, WritableSignal} from '@angular/core';
import {collection, collectionData, deleteDoc, doc, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-accidents',
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './accidents.component.html',
  styleUrl: './accidents.component.css'
})
export class AccidentsComponent {
  ModalOpen:WritableSignal<boolean> = signal<boolean>(false);
  private firestore = inject(Firestore);
  reports = signal<any[]>([]);
  selectedReport = signal<any | null>(null);
  searchControl = new FormControl('');

  constructor() {
    const reportsRef = collection(this.firestore, 'accidents');

    collectionData(reportsRef, { idField: 'id' }).subscribe((docs) => {
      const flatReports = docs.map((doc: any) => {
        const detail = doc.details?.[0] || {};
        return { ...detail, id: doc.id };
      });
      this.reports.set(flatReports);
    });
  }

  openReport(report: any) {
    this.ModalOpen.set(true)
    this.selectedReport.set(report);
  }

  deleteReport(id: string) {
    const docRef = doc(this.firestore, `reportedIncidents/${id}`);
    deleteDoc(docRef).then(() => {
      this.reports.update((prev) => prev.filter((r) => r.id !== id));
      if (this.selectedReport()?.id === id) this.selectedReport.set(null);
    });
  }

  filteredReports = computed(() => {
    const keyword = this.searchControl.value?.toLowerCase() || '';
    return this.reports().filter((r) =>
      Object.values(r).some((v) =>
        (typeof v === 'string' || typeof v === 'number') &&
        v.toString().toLowerCase().includes(keyword)
      )
    );
  });
}
