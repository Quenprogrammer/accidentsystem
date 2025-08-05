import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menuItems = [
    { name: 'Add accident', icon: 'FIRS/accidentsMenu/car-svgrepo-com.svg', link: '/addAccident' },
    { name: 'Accident reports', icon: 'FIRS/menu/reports.svg', link: '/addReports' },
    { name: 'Suspects', icon: 'FIRS/menu/arrest.svg', link: '/suspects' },
    { name: 'Officers', icon: 'FIRS/accidentsMenu/community-svgrepo-com.svg', link: '/officers' },
    { name: 'Backup database', icon: 'FIRS/menu/backup.svg', link: '' },
    { name: 'Restore database', icon: 'FIRS/menu/restore.svg', link: '' },
    { name: 'Restore database', icon: 'FIRS/menu/restore.svg', link: '' },
  ];
}
