import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WorldBankService } from '../services/world-bank.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [NgIf],
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {
  worldMapSvg: SafeHtml = '';
  selectedCountry: any = null;

  // For highlighting countries
  private selectedCountryId: string | null = null;
  private originalFill: string | null = null;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private worldBankService: WorldBankService
  ) {}

  ngOnInit() {
    this.http.get('assets/world-map.svg', { responseType: 'text' }).subscribe({
      next: (svg) => {
        // Sanitize and store the SVG
        this.worldMapSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
      },
      error: (err) => {
        console.error('Error loading SVG:', err);
      }
    });
  }

  handleMapClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const countryCode = clickedElement.id; // 2-letter country code

    // Reset previously selected country color
    if (this.selectedCountryId) {
      const prevElement = document.getElementById(this.selectedCountryId);
      if (prevElement && this.originalFill !== null) {
        prevElement.style.fill = this.originalFill;
      }
    }

    if (countryCode) {
      // Save original fill
      this.originalFill = clickedElement.style.fill || '';
      this.selectedCountryId = countryCode;

      // Highlight new country
      clickedElement.style.fill = '#ffd700'; // gold color

      // Fetch data
      this.fetchCountryData(countryCode);
    }
  }

  fetchCountryData(code: string) {
    this.worldBankService.getCountryDetails(code).subscribe((data: any) => {
      if (data && data[1] && data[1].length > 0) {
        const info = data[1][0];
        this.selectedCountry = {
          name: info.name,
          capital: info.capitalCity,
          region: info.region?.value || 'Unknown Region',
          incomeLevel: info.incomeLevel?.value || 'Unknown Income',
          longitude: info.longitude,
          latitude: info.latitude
        };
      } else {
        this.selectedCountry = null;
      }
    });
  }
}