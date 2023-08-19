import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Services
import { HttpService } from './http.service';

// Models
import { SurahResponse, SurahsResponse } from 'src/app/models/surah.model';

@Injectable({
  providedIn: 'root'
})
export class SurahService {
  BASE_URL: string = environment.baseUrl;

  constructor(private httpService: HttpService) { }

  getAllSurahs<T>(endPoint: string): Observable<SurahsResponse> {
    const apiUrl: string = `${this.BASE_URL}/${endPoint}`;
    return this.httpService.get<T>(apiUrl);
  }

  getSurah<T>(endPoint: string, surahNo: number, edition: string): Observable<SurahResponse> {
    let apiUrl: string = `${this.BASE_URL}/${endPoint}/${surahNo}`;

    if (edition) {
      apiUrl += `/${edition}`;
    }

    return this.httpService.get<T>(apiUrl);
  }
}
