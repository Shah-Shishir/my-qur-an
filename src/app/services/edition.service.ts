import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Services
import { HttpService } from './http.service';

// Models
import { EditionResponse } from '../models/edition.model';

@Injectable({
  providedIn: 'root'
})
export class EditionService {
  BASE_URL: string = environment.baseUrl;

  constructor(private httpService: HttpService) { }

  getAllEditions<T>(endPoint: string): Observable<EditionResponse> {
    const apiUrl: string = `${this.BASE_URL}/${endPoint}`;
    return this.httpService.get<T>(apiUrl);
  }

  getAllEditionsByFormat<T>(endPoint: string, format: string): Observable<EditionResponse> {
    let apiUrl: string = `${this.BASE_URL}/${endPoint}`;

    if (format) {
      apiUrl += `/${format}`;
    }

    return this.httpService.get<T>(apiUrl);
  }
}
