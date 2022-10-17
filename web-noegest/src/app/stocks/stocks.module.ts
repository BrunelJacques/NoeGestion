import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { LayoutComponent } from './layout.component';
import { InventaireComponent } from './inventaire/inventaire.component';
import { EffectifsComponent } from './effectifs/effectifs.component';


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
    ]
})
export class StocksModule { }