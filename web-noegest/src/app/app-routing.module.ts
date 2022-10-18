import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './general/home';
import { AuthGuard } from './general/_helpers';
import { NotFoundComponent } from './general/not-found/not-found.component';

const accountModule = () => import('./general/account/account.module').then(x => x.AccountModule);
const stocksModule = () => import('./stocks/stocks.module').then(x => x.StocksModule);


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'stocks', loadChildren: stocksModule },

    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }