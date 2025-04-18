import { Routes } from '@angular/router';
//import { TestComponent } from './test.component';
import { ZzTestComponent } from './zz-test/zz-test.component';
import { SortiesComponent } from '../stocks/mouvements/sorties/sorties.component';

export const testRoutes: Routes = [
  { path: '', component: ZzTestComponent },
  { path: 'zztest', component: ZzTestComponent },
  { path: 'sorties', component: SortiesComponent }
];
