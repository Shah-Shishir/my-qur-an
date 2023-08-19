import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { HttpService } from './http.service';

// Environments
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuranService {
  BASE_URL: string = environment.baseUrl;

  constructor(private httpService: HttpService) { }

  getCompleteQuran<T>(endPoint: string): Observable<T> {
    const apiUrl: string = `${this.BASE_URL}/${endPoint}`;
    return this.httpService.get<T>(apiUrl);
  }
}
