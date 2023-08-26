// Modules
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from 'src/app/core/components/header/header.module';
import { SurahModule } from './components/surah/surah.module';
import { SearchFilterUiModule } from './components/search-filter-ui/search-filter-ui.module';

// Pages & Components
import { SurahsPage } from './surahs.page';

// Routing
import { SURAH_ROUTES } from './surahs.routing';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderModule,
    SurahModule,
    SearchFilterUiModule,
    SURAH_ROUTES
  ],
  declarations: [SurahsPage]
})
export class SurahsPageModule { }
