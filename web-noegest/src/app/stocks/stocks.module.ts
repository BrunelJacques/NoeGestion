import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { LayoutComponent } from './layout.component';
import { InventaireComponent } from './inventaire/inventaire.component';
import { EffectifsComponent } from './effectifs/effectifs.component';
import { EntreesComponent } from './entrees/entrees.component';
import { OneEntreeComponent } from './one-entree/one-entree.component';
import { OneSortieComponent } from './one-sortie/one-sortie.component';
import { SortiesComponent } from './sorties/sorties.component';
import { PrixJourneeComponent } from './prix-journee/prix-journee.component';
import { ParamsComponent } from './params/params.component';
import { RepasComponent } from './params/repas/repas.component';
import { CampComponent } from './params/camp/camp.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StocksRoutingModule,
    ],
    declarations: [
        LayoutComponent,
        InventaireComponent,
        EffectifsComponent,
        EntreesComponent,
        OneEntreeComponent,
        OneSortieComponent,
        SortiesComponent,
        PrixJourneeComponent,
        ParamsComponent,
        RepasComponent,
        CampComponent,
    ],
    providers: [DatePipe]
})
export class StocksModule { }