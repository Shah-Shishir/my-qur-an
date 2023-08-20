import { Component, Input } from '@angular/core';

// Models
import { Surah } from 'src/app/models/surah.model';

// Enums
import { REVELATION_TYPES } from 'src/app/constants/enums';

@Component({
  selector: 'app-surah',
  templateUrl: './surah.component.html',
  styleUrls: ['./surah.component.scss'],
})
export class SurahComponent {
  @Input() surah!: Surah;

  revelationTypes = REVELATION_TYPES;
}
