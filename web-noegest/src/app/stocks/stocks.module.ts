import { NgModule } from '@angular/core';

import { InventaireComponent } from './inventaire/inventaire.component';
import { EffectifsComponent } from './effectifs/effectifs.component';
import { EntreesComponent } from './mouvements/entrees/entrees.component';
import { OneEntreeComponent } from './mouvements/one-entree/one-entree.component';
import { PrixJourneeComponent } from './prix-journee/prix-journee.component';
import { ArticleSearchComponent } from './mouvements/article-search/article-search.component';
import { GeneralModule } from '../general/general.module';
import { SharedModule } from '../shared/shared.modules';
import { StocksRoutingModule } from './stocks-routing.module';


@NgModule({
  declarations: [
    InventaireComponent,
    EffectifsComponent,
    EntreesComponent,
    OneEntreeComponent,
    PrixJourneeComponent,
    ArticleSearchComponent,
  ],
  imports: [
    StocksRoutingModule,
    GeneralModule,
    SharedModule,
  ],

})

export class StocksModule {}
