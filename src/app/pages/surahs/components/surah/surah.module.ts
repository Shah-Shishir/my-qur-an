// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Pages and Components
import { SurahComponent } from './surah.component';

@NgModule({
  declarations: [
    SurahComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SurahComponent
  ]
})
export class SurahModule { }
