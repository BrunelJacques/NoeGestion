import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { InventaireComponent } from './inventaire/inventaire.component';
import { EffectifsComponent } from './effectifs/effectifs.component';
import { EntreesComponent } from './mouvements/entrees/entrees.component';
import { OneEntreeComponent } from './one-entree/one-entree.component';
import { OneSortieComponent } from './one-sortie/one-sortie.component';
import { SortiesComponent } from './mouvements/sorties/sorties.component';
import { PrixJourneeComponent } from './prix-journee/prix-journee.component';
import { ParamsComponent } from './params/params.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StocksRoutingModule,
    ],
    declarations: [
        InventaireComponent,
        EffectifsComponent,
        EntreesComponent,
        OneEntreeComponent,
        OneSortieComponent,
        SortiesComponent,
        PrixJourneeComponent,
        ParamsComponent,
    ],
    providers: [DatePipe]
})
export class StocksModule { }