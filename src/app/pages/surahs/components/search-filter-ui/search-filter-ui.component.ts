import { Component, EventEmitter, Input, Output } from '@angular/core';

// Models
import { Surah } from 'src/app/models/surah.model';

@Component({
  selector: 'app-search-filter-ui',
  templateUrl: './search-filter-ui.component.html',
  styleUrls: ['./search-filter-ui.component.scss'],
})
export class SearchFilterUiComponent {
  @Input() surahs: Surah[] = [];
  @Output() updateFilteredSurahs: EventEmitter<Surah[]> = new EventEmitter<Surah[]>();

  changeInputValue(event: any) {
    const value: string = event.target.value?.toLowerCase() || "";

    const filteredSurahs = this.surahs.filter(surah => {
      const name = surah.englishName?.toLowerCase();
      return name.includes(value);
    });

    this.updateFilteredSurahs.emit(filteredSurahs);
  }
}
