import { RouterModule, Routes } from '@angular/router';
import { SurahsPage } from './surahs.page';

const routes: Routes = [
  {
    path: '',
    component: SurahsPage,
  }
];

export const HOME_ROUTES = RouterModule.forChild(routes);
