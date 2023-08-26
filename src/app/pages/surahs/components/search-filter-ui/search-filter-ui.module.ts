// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

// Components
import { SearchFilterUiComponent } from './search-filter-ui.component';

@NgModule({
  declarations: [
    SearchFilterUiComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    SearchFilterUiComponent,
  ]
})
export class SearchFilterUiModule { }
