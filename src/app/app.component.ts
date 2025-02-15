import { Component } from '@angular/core';
import { WorldMapComponent } from './world-map/world-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorldMapComponent], // ✅ Import the World Map Component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}