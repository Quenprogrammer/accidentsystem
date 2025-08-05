import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  increment,
  docData
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private collectionPath = 'STATISTICS';
  private documentId = 'general'; // You can make this dynamic if needed

  constructor(private firestore: Firestore) {}

  /**
   * Increments a field by +1 in STATISTICS/general.
   * Creates the document or field if missing.
   * @param fieldName Name of the field to increment
   */
  async increment(fieldName: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionPath}/${this.documentId}`);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      try {
        await updateDoc(docRef, {
          [fieldName]: increment(1)
        });
      } catch (err) {
        await setDoc(docRef, { [fieldName]: 1 }, { merge: true });
      }
    } else {
      await setDoc(docRef, { [fieldName]: 1 });
    }
  }

  /**
   * Increments a numeric field by any amount.
   * Useful for values like total money lost.
   * @param fieldName Name of the field
   * @param amount Numeric amount to increment by
   */
  async incrementAmount(fieldName: string, amount: number): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionPath}/${this.documentId}`);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      try {
        await updateDoc(docRef, {
          [fieldName]: increment(amount)
        });
      } catch (err) {
        await setDoc(docRef, { [fieldName]: amount }, { merge: true });
      }
    } else {
      await setDoc(docRef, { [fieldName]: amount });
    }
  }

  /**
   * Optional: Get real-time updates to the statistics document.
   */
  getStats() {
    const docRef = doc(this.firestore, `${this.collectionPath}/${this.documentId}`);
    return docData(docRef);
  }

  async getStatsOnce(): Promise<any> {
    const docRef = doc(this.firestore, `${this.collectionPath}/${this.documentId}`);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
  }

}
