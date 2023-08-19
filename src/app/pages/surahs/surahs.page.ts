import { Component } from '@angular/core';

// Services
import { SurahService } from 'src/app/services/surah.service';

// Models
import { Surah, SurahsResponse } from 'src/app/models/surah.model';

@Component({
  selector: 'app-surahs',
  templateUrl: 'surahs.page.html',
  styleUrls: ['surahs.page.scss']
})

export class SurahsPage {
  surahs: Surah[] = [];

  /* End points */
  surahEndPoint: string = 'surah';

  constructor(
    private surahService: SurahService
  ) { }

  ionViewDidEnter() {
    this.onGetSurahs();
  }

  onGetSurahs() {
    this.surahService.getAllSurahs(this.surahEndPoint)
      .subscribe({
        next: (res: SurahsResponse) => {
          this.surahs = res.data;
        }
      });
  }

  surahTrackBy(index: number, surah: Surah) {
    return surah.number;
  }
}
