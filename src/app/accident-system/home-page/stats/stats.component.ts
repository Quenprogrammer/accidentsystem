import { Component } from '@angular/core';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {collection, Firestore, getCountFromServer} from '@angular/fire/firestore';

@Component({
  selector: 'app-stats',
  imports: [
    NgForOf,
    NgIf,
    NgSwitchCase,
    NgSwitchDefault,
    NgSwitch
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  accidentsCount = 0;
  suspectsCount = 0;
  officersCount = 0;

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    this.accidentsCount = await this.getCollectionCount('accidents');
    this.suspectsCount = await this.getCollectionCount('suspects');
    this.officersCount = await this.getCollectionCount('officers');
  }

  async getCollectionCount(collectionName: string): Promise<number> {
    const collRef = collection(this.firestore, collectionName);
    const snapshot = await getCountFromServer(collRef);
    return snapshot.data().count;
  }
}
