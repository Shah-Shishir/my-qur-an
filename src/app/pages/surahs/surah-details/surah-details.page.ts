import { Component, OnInit } from '@angular/core';

// Services
import { EditionService } from 'src/app/services/edition.service';
import { SurahService } from 'src/app/services/surah.service';

// Models
import { Edition, EditionResponse } from 'src/app/models/edition.model';
import { Ayah, Surah, SurahResponse } from 'src/app/models/surah.model';

// Enums
import { EDITION } from 'src/app/constants/enums';
import { ActionSheetButton } from '@ionic/angular';

@Component({
  selector: 'app-surah-details',
  templateUrl: './surah-details.page.html',
  styleUrls: ['./surah-details.page.scss'],
})
export class SurahDetailsPage implements OnInit {
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
    private surahService: SurahService) { }

  ngOnInit() {
  }

  onGetAudioEditions() {
    this.editionService.getAllEditionsByFormat(this.editionEndPoint, EDITION.AUDIO)
      .subscribe({
        next: (res: EditionResponse) => {
          this.audioEditions = res.data;
        }
      });
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
          this.getAudioData(surah);
        }
      };
      this.actionSheetButtons.push(editionData);
    });
    //}

    this.setOpen(true);
  }

  getAudioData(surah: Surah) {
    this.surahService.getSurah(this.surahEndPoint, surah.number, this.selectedAudioEdition)
      .subscribe({
        next: (res: SurahResponse) => {
          this.playSurah(surah, res.data.ayahs, 0);
        }
      });
  }

  playSurah(surah: Surah, ayahs: Ayah[], index: number) {
    if (ayahs.length === index) {
      return;
    }

    const audioEl: HTMLAudioElement = document.querySelector(".audio-section > audio")!;

    audioEl.style.display = 'none';
    audioEl.src = ayahs[index].audio;
    audioEl.play();

    audioEl.addEventListener("ended", () => {
      this.playSurah(surah, ayahs, ++index);
    });
  }

  stopSurah(surah: Surah) {
    const audioEl: HTMLAudioElement = document.querySelector(".audio-section > audio")!;
    // this.audioEl.pause();
    audioEl.currentTime = 0;
  }
}
