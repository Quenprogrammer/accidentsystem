import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-accident-startup',
  imports: [
    DecimalPipe
  ],
  templateUrl: './accident-startup.component.html',
  styleUrl: './accident-startup.component.css'
})
export class AccidentStartupComponent {
  progress = 0;
  intervalId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const totalDuration = 10_000; // 30 seconds
    const tick = 100; // update every 300ms
    const increment = 100 / (totalDuration / tick);

    this.intervalId = setInterval(() => {
      this.progress += increment;
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(this.intervalId);
        this.router.navigate(['/homepage']); // Redirect after 30s
      }
    }, tick);
  }
}
