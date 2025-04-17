import { Routes } from '@angular/router';
import { HomeComponent } from './general/home';
import { AuthGuard } from './general/_helpers/auth.guard';
import { NotFoundComponent } from './general/not-found';

import { ZzTestComponent } from './zz-test/zz-test.component';

const accountModule = () => import('./general/account/account.module').then(x => x.AccountModule);
const stocksModule = () => import('./stocks/stocks.module').then(x => x.StocksModule);

export const routes: Routes = [
    { path: 'zztest', component: ZzTestComponent},
    { path: 'account', loadChildren: accountModule },
    { path: 'stocks', loadChildren: stocksModule },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', component: NotFoundComponent }
];
