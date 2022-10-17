import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { EffectifsComponent } from './effectifs/effectifs.component';
import { InventaireComponent } from './inventaire/inventaire.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'effectifs', component: EffectifsComponent },
            { path: 'register', component: InventaireComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StocksRoutingModule { }