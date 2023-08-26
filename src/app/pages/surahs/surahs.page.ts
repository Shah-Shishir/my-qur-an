import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

// Services
import { SurahService } from 'src/app/services/surah.service';

// Models
import { Surah, SurahsResponse } from 'src/app/models/surah.model';


/**
 * This page manages surah listing and filtering, sorting, searching
 * @date 8/26/2023 - 6:45:29 PM
 *
 * @export
 * @class SurahsPage
 * @typedef {SurahsPage}
 */
@Component({
  selector: 'app-surahs',
  templateUrl: 'surahs.page.html',
  styleUrls: ['surahs.page.scss']
})

export class SurahsPage {
  /**
   * Ion content reference
   * @date 8/26/2023 - 7:59:30 PM
   *
   * @type {IonContent}
   */
  @ViewChild(IonContent) content!: IonContent;

  /**
   * Show/hide button to scroll to top
   * @date 8/26/2023 - 8:03:53 PM
   *
   * @type {boolean}
   */
  showScrollToTopBtn: boolean = false;

  /**
   * Surah list
   * @date 8/26/2023 - 6:45:29 PM
   *
   * @type {Surah[]}
   */
  surahs: Surah[] = [];
  /**
   * Filtered Surah list
   * @date 8/26/2023 - 6:45:29 PM
   *
   * @type {Surah[]}
   */
  filteredSurahs: Surah[] = [];

  /**
   * Surah No to scroll to a specific surah
   * @date 8/26/2023 - 7:09:24 PM
   *
   * @type {number}
   */
  surahNo: number = 1;

  /* Surah endpoint */
  /**
   * Description placeholder
   * @date 8/26/2023 - 6:45:29 PM
   *
   * @type {string}
   */
  surahEndPoint: string = 'surah';

  /**
   * Creates an instance of SurahsPage.
   * @date 8/26/2023 - 6:45:29 PM
   *
   * @constructor
   * @param {SurahService} surahService
   */
  constructor(
    private surahService: SurahService
  ) { }

  /**
   * Lifycycle method which is fired when this Ionic page enters
   * @date 8/26/2023 - 6:45:29 PM
   */
  ionViewDidEnter() {
    this.onGetSurahs();
  }

  /**
   * Track scrolling
   * @date 8/26/2023 - 7:53:05 PM
   *
   * @param {*} event
   */
  scrollPage(event: any) {
    if (event.detail.scrollTop > 50) {
      this.showScrollToTopBtn = true;
    } else {
      this.showScrollToTopBtn = false;
    }
  }

  /**
   * Scroll to top
   * @date 8/26/2023 - 7:58:54 PM
   */
  scrollToTop() {
    this.content.scrollToTop(500);
  }

  /**
   * Fetching surahs from API
   * @date 8/26/2023 - 6:45:29 PM
   */
  onGetSurahs() {
    this.surahService.getAllSurahs(this.surahEndPoint)
      .subscribe({
        next: (res: SurahsResponse) => {
          this.surahs = res.data;
          this.filteredSurahs = res.data;
        }
      });
  }

  /**
   * Track by function for optimization
   * @date 8/26/2023 - 6:45:29 PM
   *
   * @param {number} index
   * @param {Surah} surah
   * @returns {*}
   */
  surahTrackBy(index: number, surah: Surah) {
    return surah.number;
  }

  /**
   * Update surah list according to event emitter
   * @date 8/26/2023 - 6:45:29 PM
   *
   * @param {Surah[]} event
   */
  updateFilteredSurahs(event: Surah[]) {
    this.filteredSurahs = event;
  }

  /**
   * Fired when inputting surah no
   * @date 8/26/2023 - 7:08:38 PM
   *
   * @param {*} event
   */
  inputSurahNo(event: any) {
    if (this.surahNo?.toString().length > 3) {
      this.surahNo = +this.surahNo.toString().slice(0, 3);
      event.target.value = this.surahNo;
    } else if (this.surahNo > 114) {
      this.surahNo = event.target.value = 114;
    } else if (Number.isInteger(this.surahNo) && this.surahNo < 1) {
      this.surahNo = event.target.value = 1;
    }
  }

  /**
   * Scroll to specific surah from the list
   * @date 8/26/2023 - 6:56:44 PM
   */
  goToSurah() {
    const surah: HTMLElement = document.querySelector(`.surah-${this.surahNo}`)!;

    if (surah) {
      surah.scrollIntoView({
        behavior: 'smooth',
        block: "center"
      });

      surah.style.border = '2px solid #eb445a';

      setTimeout(() => {
        surah.style.border = 'initial';
      }, 3000);
    }
  }
}
