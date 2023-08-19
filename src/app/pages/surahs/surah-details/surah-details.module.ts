// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from 'src/app/core/components/header/header.module';

// Pages and Components
import { SurahDetailsPage } from './surah-details.page';

// Routing
import { SURAH_DETAIL_ROUTE } from './surah-details.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    SURAH_DETAIL_ROUTE
  ],
  declarations: [SurahDetailsPage]
})
export class SurahDetailsPageModule { }
