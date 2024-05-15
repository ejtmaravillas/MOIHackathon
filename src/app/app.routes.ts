import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full',
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'home-defer',
    loadComponent: () => import('./home-defer/home-defer.page').then( m => m.HomeDeferPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
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
    path: 'phaser-game',
    loadComponent: () => import('./phaser-game/phaser-game.page').then( m => m.PhaserGamePage)
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
