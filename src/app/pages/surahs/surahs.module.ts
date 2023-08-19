// Modules
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from 'src/app/core/components/header/header.module';

// Pages & Components
import { SurahsPage } from './surahs.page';

// Routing
import { HOME_ROUTES } from './surahs.routing';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderModule,
    HOME_ROUTES
  ],
  declarations: [SurahsPage]
})
export class SurahsPageModule { }
