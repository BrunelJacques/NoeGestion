import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/general/_helpers';

import { SortiesComponent } from './mouvements/sorties/sorties.component';
import { OneSortieComponent } from './mouvements/one-sortie/one-sortie.component';
import { EntreesComponent } from './mouvements/entrees/entrees.component';
import { OneEntreeComponent } from './mouvements/one-entree/one-entree.component';
import { EffectifsComponent } from './effectifs/effectifs.component';
import { InventaireComponent } from './inventaire/inventaire.component';
import { PrixJourneeComponent } from './prix-journee/prix-journee.component';
import { ParamsComponent } from './params/params.component';
import { ArticleSearchComponent } from './mouvements/article-search/article-search.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'sorties', component: SortiesComponent },
            { path: 'onesortie/:id', component: OneSortieComponent },
            { path: 'entrees', component: EntreesComponent, canActivate: [AuthGuard] },
            { path: 'oneentree/:id', component: OneEntreeComponent, canActivate: [AuthGuard] },
            { path: 'effectifs', component: EffectifsComponent, canActivate: [AuthGuard] },
            { path: 'inventaire', component: InventaireComponent, canActivate: [AuthGuard] },
            { path: 'prixjournees', component: PrixJourneeComponent, canActivate: [AuthGuard] },
            { path: 'params', component: ParamsComponent },
            { path: 'articlesearch', component: ArticleSearchComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StocksRoutingModule { }