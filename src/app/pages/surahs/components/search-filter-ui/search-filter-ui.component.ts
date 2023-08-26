import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges } from '@angular/core';

// Data
import { relevationFilterOptions, surahNameSortingOptions, ayahSortingOptions } from 'src/app/data/data';

// Models
import { Surah } from 'src/app/models/surah.model';

/**
 * This component is used to Search, Filter and Sort Surahs
 * @date 8/26/2023 - 2:21:47 PM
 *
 * @export
 * @class SearchFilterUiComponent
 * @typedef {SearchFilterUiComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-search-filter-ui',
  templateUrl: './search-filter-ui.component.html',
  styleUrls: ['./search-filter-ui.component.scss'],
})
export class SearchFilterUiComponent implements OnInit {
  /**
   * Determines whether the filter section should be shown or not
   * @date 8/26/2023 - 2:21:47 PM
   *
   * @type {boolean}
   */
  showFilterSection: boolean = true;

  /**
   * Search value on searchbar
   * @date 8/26/2023 - 5:52:46 PM
   *
   * @type {string}
   */
  searchText: string = "";

  /**
   * Relevation options for filtering
   * @date 8/26/2023 - 2:21:47 PM
   *
   * @type {*}
   */
  relevationFilterOptions = relevationFilterOptions;

  /**
   * Sort by surah name options
   * @date 8/26/2023 - 3:54:17 PM
   *
   * @type {*}
   */
  surahNameSortingOptions = surahNameSortingOptions;

  /**
   * Surah name sorting radio button current value
   * @date 8/26/2023 - 5:38:00 PM
   *
   * @type {number}
   */
  currentNameSortingId: number = surahNameSortingOptions[0].id;

  /**
   * Sort by ayah name options
   * @date 8/26/2023 - 3:54:17 PM
   *
   * @type {*}
   */
  ayahSortingOptions = ayahSortingOptions;

  /**
   * Ayah sorting radio button current value
   * @date 8/26/2023 - 5:38:00 PM
   *
   * @type {number}
   */
  currentAyahSortingId: number = ayahSortingOptions[0].id;

  /**
   * The array to store checked checkbox Ids
   * @date 8/26/2023 - 2:21:47 PM
   *
   * @type {number[]}
   */
  checkedTypes: string[] = [];

  /**
   * Filtered Surah List
   * @date 8/26/2023 - 5:00:04 PM
   *
   * @type {Surah[]}
   */
  filteredSurahs: Surah[] = [];

  /**
   * Surah list
   * @date 8/26/2023 - 2:21:47 PM
   *
   * @type {Surah[]}
   */
  @Input() surahs: Surah[] = [];

  /**
   * Output method to search, sort and filter surahs
   * @date 8/26/2023 - 2:21:47 PM
   *
   * @type {EventEmitter<Surah[]>}
   */
  @Output() updateFilteredSurahs: EventEmitter<Surah[]> = new EventEmitter<Surah[]>();

  /**
   * Lifecycle hook that is fired when the components initializes
   * @date 8/26/2023 - 2:21:47 PM
   */
  ngOnInit() {
    this.setCheckedTypes();
  }

  /**
   * Lifecycle hook that is fired when any input data value changes
   * @date 8/26/2023 - 5:13:41 PM
   *
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['surahs']?.currentValue) {
      this.filteredSurahs = this.surahs;
    }
  }

  /**
   * Set types which are checked
   * @date 8/26/2023 - 2:21:47 PM
   */
  setCheckedTypes() {
    this.relevationFilterOptions.forEach(option => this.checkedTypes.push(option.label));
  }

  /**
   * Search surahs
   * @date 8/26/2023 - 2:21:47 PM
   *
   * @param {*} event
   */
  changeInputValue(event: any) {
    const value: string = event.target.value?.toLowerCase() || "";

    this.filteredSurahs = this.filteredSurahs.filter(surah => {
      const name = surah.englishName?.toLowerCase();
      return name.includes(value);
    });

    this.updateFilteredSurahs.emit(this.filteredSurahs);
  }

  /**
   * Filter surahs according to relevation types
   * @date 8/26/2023 - 2:21:47 PM
   *
   * @param {*} event
   * @param {number} id
   */
  filterSurahs(event: any, label: string) {
    const { checked } = event.detail;

    if (checked) {
      this.checkedTypes.push(label);
    } else {
      const index: number = this.checkedTypes.findIndex(type => type === label)
      this.checkedTypes.splice(index, 1);
    }

    this.filteredSurahs = this.surahs.filter(surah => this.checkedTypes.includes(surah.revelationType));

    this.updateFilteredSurahs.emit(this.filteredSurahs);
  }

  /**
   * Sort Surahs By Name
   * @date 8/26/2023 - 3:54:17 PM
   *
   * @param {*} event
   */
  sortSurahsByName(event: any) {
    const { value } = event.target;

    switch (value) {
      case 1: {
        this.filteredSurahs.sort((firstSurah, secondSurah) => firstSurah.number - secondSurah.number);
        break;
      }

      case 2: {
        this.filteredSurahs.sort((firstSurah, secondSurah) => firstSurah.name.localeCompare(secondSurah.name));
        break;
      }

      case 3: {
        this.filteredSurahs.sort((firstSurah, secondSurah) => secondSurah.name.localeCompare(firstSurah.name));
        break;
      }
    }

    this.updateFilteredSurahs.emit(this.filteredSurahs);
  }

  /**
   * Sort Surahs By Ayah
   * @date 8/26/2023 - 3:54:17 PM
   *
   * @param {*} event
   */
  sortSurahsByAyahs(event: any) {
    const { value } = event.target;

    switch (value) {
      case 1: {
        this.filteredSurahs.sort((firstSurah, secondSurah) => firstSurah.number - secondSurah.number);
        break;
      }

      case 2: {
        this.filteredSurahs.sort((firstSurah, secondSurah) => firstSurah.numberOfAyahs - secondSurah.numberOfAyahs);
        break;
      }

      case 3: {
        this.filteredSurahs.sort((firstSurah, secondSurah) => secondSurah.numberOfAyahs - firstSurah.numberOfAyahs);
        break;
      }
    }

    this.updateFilteredSurahs.emit(this.filteredSurahs);
  }

  /**
   * Reset all searching, sorting, filtering data
   * @date 8/26/2023 - 5:26:07 PM
   */
  resetFiltering() {
    this.filteredSurahs = JSON.parse(JSON.stringify(this.surahs));
    this.updateFilteredSurahs.emit(this.filteredSurahs);

    this.searchText = "";

    const checkboxes = document.querySelectorAll('ion-checkbox');
    checkboxes.forEach(el => el.checked = true);

    this.currentNameSortingId = this.surahNameSortingOptions[0].id;
    this.currentAyahSortingId = this.ayahSortingOptions[0].id;
  }

  /**
   * Close the component
   * @date 8/26/2023 - 5:26:07 PM
   */
  closeFilterSection() {
    this.resetFiltering();
    this.showFilterSection = false;
  }
}
