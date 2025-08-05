import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-statistics-card',
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    RouterLink,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './statistics-card.component.html',
  styleUrl: './statistics-card.component.css'
})
export class StatisticsCardComponent {

}
