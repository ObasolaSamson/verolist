import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'business/:id',
    loadComponent: () => import('./features/business-detail/business-detail.component').then(m => m.BusinessDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

