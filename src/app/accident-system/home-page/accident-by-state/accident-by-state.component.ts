import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {LoadingDataComponent} from '../../../core/loading-data/loading-data.component';
import {MenuComponent} from '../../menu/menu.component';

@Component({
  selector: 'app-accident-by-state',
  standalone: true,
  templateUrl: './accident-by-state.component.html',
  styleUrl: './accident-by-state.component.css',
  imports: [
    RouterLink,
    NgIf,
    LoadingDataComponent,
    MenuComponent
  ]
})
export class AccidentByStateComponent implements OnChanges {
  @Input() stats!: any;
  loading = true;
  menuItems = [
    { name: 'Add accident', icon: 'FIRS/accidentsMenu/car-svgrepo-com.svg', link: '/addAccident' },
    { name: 'Accident reports', icon: 'FIRS/menu/reports.svg', link: '/addReports' },
    { name: 'Suspects', icon: 'FIRS/menu/arrest.svg', link: '/suspects' },
    { name: 'Officers', icon: 'FIRS/accidentsMenu/community-svgrepo-com.svg', link: '/viewOfficers' },
    { name: 'Add officers', icon: 'FIRS/menu/backup.svg', link: '/addOfficers' },
    { name: 'Restore database', icon: 'FIRS/menu/restore.svg', link: '' },

  ];

  accidentByState = [
    { name: 'Kano', key: 'kano', icon: 'FIRS/maps/kano.svg', value: 0 },
    { name: 'Kaduna', key: 'kaduna', icon: 'FIRS/maps/kaduna.avif', value: 0 },
    { name: 'Katsina', key: 'katsina', icon: 'FIRS/maps/katsina.svg', value: 0 },
    { name: 'Abuja', key: 'abuja', icon: 'FIRS/maps/abuja.avif', value: 0 },
    { name: 'Yobe', key: 'yobe', icon: 'FIRS/maps/yobe.png', value: 0 },
    { name: 'Jigawa', key: 'jigawa', icon: 'FIRS/maps/jigawa.svg', value: 0 },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stats'] && this.stats) {
      this.updateAccidentCounts();
    }
  }

  updateAccidentCounts() {
    this.loading = true;
    this.accidentByState = this.accidentByState.map(state => ({
      ...state,
      value: this.stats['state_' + state.key] || 0
    }));
    this.loading = false;
  }

}
