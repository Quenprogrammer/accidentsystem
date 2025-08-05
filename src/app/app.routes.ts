import { Routes } from '@angular/router';

export const routes: Routes = [

  {path: '', loadComponent: () => import('../app/accident-system/accident-startup/accident-startup.component').then(_ => _.AccidentStartupComponent)},
  {path: 'DB', loadComponent: () => import('../app/accident-system/db/db').then(_ => _.DB)},
  {path: 'addOfficers', loadComponent: () => import('../app/accident-system/home-page/add-officres/add-officres').then(_ => _.AddOfficres)},
  {path: 'viewOfficers', loadComponent: () => import('../app/accident-system/home-page/view-officers/view-officers').then(_ => _.ViewOfficers)},
  {path: 'addSuspects', loadComponent: () => import('../app/accident-system/home-page/add-suspect/add-suspect').then(_ => _.AddSuspect)},
  {path: 'homepage', loadComponent: () => import('../app/accident-system/home-page/home-page.component').then(_ => _.HomePageComponent)},
  {path: 'invalidUser', loadComponent: () => import('../app/invalid-user/invalid-user.component').then(_ => _.InvalidUserComponent)},
  {path: 'addReports', loadComponent: () => import('../app/accident-system/home-page/accidents-reports/accidents-reports.component').then(_ => _.AccidentsReportsComponent)},
  {path: 'addAccident', loadComponent: () => import('../app/accident-system/home-page/add-accident/add-accident.component').then(_ => _.AddAccidentComponent)},
  {path: 'ViewAccident', loadComponent: () => import('../app/accident-system/home-page/view-accidents/view-accidents.component').then(_ => _.ViewAccidentsComponent)},
  {path: 'suspects', loadComponent: () => import('../app/accident-system/home-page/suspects/suspects.component').then(_ => _.SuspectsComponent)},
  {path: 'officers', loadComponent: () => import('../app/accident-system/home-page/officers/officers.component').then(_ => _.OfficersComponent)},
  {path: 'DB', loadComponent: () => import('../app/accident-system/home-page/search-data/search-data.component').then(_ => _.SearchDataComponent)},
  {path: 'accidentsReports', loadComponent: () => import('../app/accident-system/home-page/accidents-reports/accidents-reports.component').then(_ => _.AccidentsReportsComponent)},

];
