import { Routes } from '@angular/router';
import { WorldMapComponent } from './components/world-map/world-map.component';
// Import any other standalone components you'd like to route to.

export const appRoutes: Routes = [
  // Redirect from root to /map
  { path: '', redirectTo: '/map', pathMatch: 'full' },

  // Example route for your WorldMapComponent
  { path: 'map', component: WorldMapComponent },

  // Optionally handle invalid routes with a wildcard
  { path: '**', redirectTo: 'map' }
];