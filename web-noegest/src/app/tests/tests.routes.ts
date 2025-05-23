import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ZzTestComponent } from './zz-test/zz-test.component';
import { SortiesComponent } from '../stocks/mouvements/sorties/sorties.component';

export const testsRoutes: Routes = [
  { path: '', component: ZzTestComponent },
  { path: 'test', component: TestComponent },
  { path: 'zz-test', component: ZzTestComponent },
  { path: 'sorties', component: SortiesComponent }
];
