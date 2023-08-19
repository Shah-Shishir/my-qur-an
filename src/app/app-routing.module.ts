import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './core/components/tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'surahs',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'surahs',
        loadChildren: () => import('./pages/surahs/surahs.module').then(m => m.SurahsPageModule)
      }
    ]
  },
  {
    path: 'surah-details',
    loadChildren: () => import('./pages/surahs/surah-details/surah-details.module').then( m => m.SurahDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
