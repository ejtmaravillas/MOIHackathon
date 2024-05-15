import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full',
  },
  {
    path: 'game',
    loadComponent: () => import('./game/game.page').then( m => m.GamePage)
  },
  {
    path: 'landing-page',
    loadComponent: () => import('./landing-page/landing-page.page').then( m => m.LandingPagePage)
  },
  {
    path: 'start-game',
    loadComponent: () => import('./start-game/start-game.page').then( m => m.StartGamePage)
  },
  {
    path: 'podreport',
    loadComponent: () => import('./podreport/podreport.page').then( m => m.PODReportPage)
  },
  {
    path: 'helppage',
    loadComponent: () => import('./helppage/helppage.page').then( m => m.HelppagePage)
  },
];
