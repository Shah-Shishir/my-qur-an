import { Component, Input } from '@angular/core';

// Models
import { Surah } from 'src/app/models/surah.model';

@Component({
  selector: 'app-surah',
  templateUrl: './surah.component.html',
  styleUrls: ['./surah.component.scss'],
})
export class SurahComponent {
  @Input() surah!: Surah;
}
