import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './general/home';
import { AuthGuard } from './general/_helpers/auth.guard';
import { NotFoundComponent } from './general/not-found';

import { ZzTestComponent } from './zz-test/zz-test.component';
import { RegisterComponent } from './general/account/register';

const accountModule = () => import('./general/account/account.module').then(x => x.AccountModule);
const stocksModule = () => import('./stocks/stocks.module').then(x => x.StocksModule);

const routes: Routes = [
    { path: 'zztest', component: RegisterComponent},
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'stocks', loadChildren: stocksModule },

    // otherwise redirect to home
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }