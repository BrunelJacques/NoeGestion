import { Routes } from '@angular/router';
import { HomeComponent } from './general/home';
//import { AuthGuard } from './general/_helpers/auth.guard';
import { NotFoundComponent } from './general/not-found';

import { ZzTestComponent } from './tests/zz-test/zz-test.component';
import { TestsComponent } from './tests/tests.component';
import { testsRoutes } from './tests/tests.routes';
import { StocksComponent } from './stocks/stocks.component';
import { stocksRoutes } from './stocks/stocks.routes';

const accountRouting = () => import('./general/account/account-routing.module').then(x => x.AccountRoutingModule);

export const routes: Routes = [
    { path: 'zz-test', component: ZzTestComponent},
    { path: 'account', loadChildren: accountRouting },
    { path: 'tests', component:TestsComponent, children: testsRoutes },
    { path: 'stocks', component:StocksComponent, children: stocksRoutes },
    { path: '', component: HomeComponent },

    { path: '**', component: NotFoundComponent }
];
