import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './general/home/home.component';
import { AuthGuard } from './general/_helpers';
import { NotFoundComponent } from './general/not-found/not-found.component';

const accountModule = () => import('./general/account/account.module').then(x => x.AccountModule);
const stocksModule = () => import('./stocks/stocks.module').then(x => x.StocksModule);
const utilsModule = () => import('./general/utils/utils.module').then(x => x.UtilsModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'stocks', loadChildren: stocksModule },
    { path: 'utils', loadChildren: utilsModule },

    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }