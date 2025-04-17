import { Routes } from '@angular/router';
import { HomeComponent } from './general/home';
import { AuthGuard } from './general/_helpers/auth.guard';
import { NotFoundComponent } from './general/not-found';

import { ZzTestComponent } from './zz-test/zz-test.component';
//import { SortiesComponent } from './stocks/mouvements/sorties/sorties.component';
import { EffectifsComponent } from './stocks/effectifs/effectifs.component';
import { InventaireComponent } from './stocks/inventaire/inventaire.component';
import { PrixJourneeComponent } from './stocks/prix-journee/prix-journee.component';
import { EntreesComponent } from './stocks/mouvements/entrees/entrees.component';
import { ParamsComponent } from './stocks/params/params.component';
import { OneSortieComponent } from './stocks/mouvements/one-sortie/one-sortie.component';
import { OneEntreeComponent } from './stocks/mouvements/one-entree/one-entree.component';
import { CampsResolver } from './stocks/_resolvers/camps.resolvers';

const accountRouting = () => import('./general/account/account-routing.module').then(x => x.AccountRoutingModule);
//const stocksRouting = () => import('./stocks/stocks-routing.module').then(x => x.StocksRoutingModule);

export const routes: Routes = [
    { path: 'zztest', component: ZzTestComponent},
    { path: 'test', component: NotFoundComponent },
    { path: 'account', loadChildren: accountRouting },
    //{ path: 'zzstocks', loadChildren: stocksRouting },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    {
      path: 'stocks', component: HomeComponent,
      children: [
          { path: '', component: HomeComponent },
            { path: 'sorties', component: NotFoundComponent },
            { path: 'entrees', component: EntreesComponent, canActivate: [AuthGuard] },
            { path: 'effectifs', component: EffectifsComponent, canActivate: [AuthGuard] },
            { path: 'inventaire', component: InventaireComponent },
            { path: 'prixjournees', component: PrixJourneeComponent, canActivate: [AuthGuard] },
            { path: 'params', component: ParamsComponent },
            { path: 'oneentree/:id', component: OneEntreeComponent, canActivate: [AuthGuard] },
            { path: 'onesortie/:id', component: OneSortieComponent, resolve: { camps: CampsResolver} }
      ],
      },

    // otherwise redirect to home
    { path: '**', component: NotFoundComponent }
];
