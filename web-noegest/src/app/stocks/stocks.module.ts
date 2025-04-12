import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InventaireComponent } from './inventaire/inventaire.component';
import { EffectifsComponent } from './effectifs/effectifs.component';
import { EntreesComponent } from './mouvements/entrees/entrees.component';
import { OneEntreeComponent } from './mouvements/one-entree/one-entree.component';
import { SortiesComponent } from './mouvements/sorties/sorties.component';
import { PrixJourneeComponent } from './prix-journee/prix-journee.component';
import { OneSortieComponent } from './mouvements/one-sortie/one-sortie.component';
import { ArticleSearchComponent } from './mouvements/article-search/article-search.component';
import { ParamsComponent } from './params/params.component';
import { GeneralModule } from '../general/general.module';
import { SharedModule } from '../shared/shared.modules';
import { StocksRoutingModule } from './stocks-routing.module';



@NgModule({
  declarations: [
    ParamsComponent,
    InventaireComponent,
    EffectifsComponent,
    EntreesComponent,
    OneEntreeComponent,
    SortiesComponent,
    OneSortieComponent,
    PrixJourneeComponent,
    ArticleSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StocksRoutingModule,
    GeneralModule,
    SharedModule,
  ],

})

export class StocksModule { }
