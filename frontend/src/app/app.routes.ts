import { Routes } from '@angular/router';
import { Products } from './pages/products/products';
import { RickAndMorty } from './pages/rick-and-morty/rick-and-morty';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: Products },
  { path: 'rick-and-morty', component: RickAndMorty },
  { path: '**', redirectTo: 'products' }
];