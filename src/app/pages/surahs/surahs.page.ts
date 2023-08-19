import { Component } from '@angular/core';
import { ActionSheetButton } from '@ionic/angular';

// Services
import { EditionService } from 'src/app/services/edition.service';
import { SurahService } from 'src/app/services/surah.service';

// Models
import { Edition, EditionResponse } from 'src/app/models/edition.model';
import { Ayah, Surah, SurahResponse, SurahsResponse } from 'src/app/models/surah.model';

// Enums
import { EDITION } from 'src/app/constants/enums';

@Component({
  selector: 'app-surahs',
  templateUrl: 'surahs.page.html',
  styleUrls: ['surahs.page.scss']
})

export class SurahsPage {
  audioEditions: Edition[] = [];
  surahs: Surah[] = [];
  surahInAudioEdition!: Surah;

  selectedAudioEdition: string = "";

  actionSheetButtons: ActionSheetButton[] = [];
  isActionSheetOpen: boolean = false;

  /* End points */
  editionEndPoint: string = 'edition/format';
  surahEndPoint: string = 'surah';

  constructor(
    private editionService: EditionService,
    private surahService: SurahService
  ) { }

  ionViewDidEnter() {
    this.onGetAudioEditions();
  }

  onGetAudioEditions() {
    this.editionService.getAllEditionsByFormat(this.editionEndPoint, EDITION.AUDIO).subscribe({
      next: (res: EditionResponse) => {
        this.audioEditions = res.data;
        this.onGetSurahs();
      }
    });
  }

  onGetSurahs() {
    this.surahService.getAllSurahs(this.surahEndPoint).subscribe({
      next: (res: SurahsResponse) => {
        this.surahs = res.data;
        this.surahs.forEach(surah => surah.currentlyPlaying = false);
      }
    });
  }

  surahTrackBy(index: number, surah: Surah) {
    return surah.number;
  }

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

  openActionSheet(surah: Surah) {
    //if (!this.selectedAudioEdition) {
    this.actionSheetButtons = [];

    this.audioEditions.forEach(edition => {
      const editionData: ActionSheetButton = {
        text: `${edition.englishName} - ${edition.language}`,
        handler: () => {
          this.selectedAudioEdition = edition.identifier;
          surah.currentlyPlaying = true;
          this.getAudioData(surah);
        }
      };
      this.actionSheetButtons.push(editionData);
    });
    //}

    this.setOpen(true);
  }

  getAudioData(surah: Surah) {
    this.surahService.getSurah(this.surahEndPoint, surah.number, this.selectedAudioEdition).subscribe({
      next: (res: SurahResponse) => {
        this.playSurah(surah, res.data.ayahs, 0);
      }
    });
  }

  playSurah(surah: Surah, ayahs: Ayah[], index: number) {
    if (ayahs.length === index) {
      surah.currentlyPlaying = false;
      return;
    }

    const audio = document.createElement("audio");
    audio.style.display = 'none';
    audio.src = ayahs[index].audio;
    audio.play();

    audio.addEventListener("ended", () => {
      this.playSurah(surah, ayahs, ++index);
    });
  }
}
