import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/general/_helpers';

import { LayoutComponent } from './layout.component';
import { SortiesComponent } from './sorties/sorties.component';
import { OneSortieComponent } from './one-sortie/one-sortie.component';
import { EntreesComponent } from './entrees/entrees.component';
import { OneEntreeComponent } from './one-entree/one-entree.component';
import { EffectifsComponent } from './effectifs/effectifs.component';
import { InventaireComponent } from './inventaire/inventaire.component';
import { PrixJourneeComponent } from './prix-journee/prix-journee.component';
import { ParamsComponent } from './params/params.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'sorties', component: SortiesComponent, canActivate: [AuthGuard] },
            { path: 'onesortie/:id', component: OneSortieComponent, canActivate: [AuthGuard] },
            { path: 'entrees', component: EntreesComponent, canActivate: [AuthGuard] },
            { path: 'oneentree/:id', component: OneEntreeComponent, canActivate: [AuthGuard] },
            { path: 'effectifs', component: EffectifsComponent, canActivate: [AuthGuard] },
            { path: 'inventaire', component: InventaireComponent, canActivate: [AuthGuard] },
            { path: 'prixjournees', component: PrixJourneeComponent, canActivate: [AuthGuard] },
            { path: 'params', component: ParamsComponent, canActivate: [AuthGuard] },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StocksRoutingModule { }