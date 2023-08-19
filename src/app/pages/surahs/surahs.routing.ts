import { RouterModule, Routes } from '@angular/router';
import { SurahsPage } from './surahs.page';

const routes: Routes = [
  {
    path: '',
    component: SurahsPage,
    children: [
      {
        path: ':number',
        loadChildren: () => import('./surah-details/surah-details.module').then(m => m.SurahDetailsPageModule)
      }
    ]
  }
];

export const SURAH_ROUTES = RouterModule.forChild(routes);
