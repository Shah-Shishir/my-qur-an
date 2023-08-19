// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Components
import { SearchFilterUiComponent } from './search-filter-ui.component';

@NgModule({
  declarations: [
    SearchFilterUiComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SearchFilterUiComponent,
  ]
})
export class SearchFilterUiModule { }
