import { Routes, RouterModule } from '@angular/router';
import { SurahDetailsPage } from './surah-details.page';

const routes: Routes = [
  {
    path: '',
    component: SurahDetailsPage
  }
];

export const SURAH_DETAIL_ROUTE = RouterModule.forChild(routes);

