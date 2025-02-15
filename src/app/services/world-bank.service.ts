import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldBankService {
  private baseUrl = 'https://api.worldbank.org/v2/';

  constructor(private http: HttpClient) {}

  getCountryDetails(code: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}country/${code}?format=json`);
  }
}
