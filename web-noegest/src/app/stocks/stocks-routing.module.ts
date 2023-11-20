import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../general/_helpers/auth.guard';

import { SortiesComponent } from './mouvements/sorties/sorties.component';
import { OneSortieComponent } from './mouvements/one-sortie/one-sortie.component';
import { EntreesComponent } from './mouvements/entrees/entrees.component';
import { OneEntreeComponent } from './mouvements/one-entree/one-entree.component';
import { EffectifsComponent } from './effectifs/effectifs.component';
import { InventaireComponent } from './inventaire/inventaire.component';
import { PrixJourneeComponent } from './prix-journee/prix-journee.component';
import { ParamsComponent } from './params/params.component';
import { ArticlesNomResolver } from './_resolvers/articles.resolvers';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'sorties', component: SortiesComponent },
            { path: 'entrees', component: EntreesComponent, canActivate: [AuthGuard] },
            { path: 'effectifs', component: EffectifsComponent, canActivate: [AuthGuard] },
            { path: 'inventaire', component: InventaireComponent },
            { path: 'prixjournees', component: PrixJourneeComponent, canActivate: [AuthGuard] },
            { path: 'params', component: ParamsComponent },
            { path: 'oneentree/:id', component: OneEntreeComponent, canActivate: [AuthGuard] },
            { path: 'onesortie/:id', component: OneSortieComponent, resolve: { onesortie: ArticlesNomResolver}, },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StocksRoutingModule { }
