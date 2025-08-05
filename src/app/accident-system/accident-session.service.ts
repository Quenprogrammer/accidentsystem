import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccidentSessionService {
  accidentId = signal<string>(''); // Shared signal for current accident doc ID
}
