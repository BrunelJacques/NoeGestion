import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputDateComponent } from './input-date/input-date.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'date', component: InputDateComponent}, 
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UtilsRoutingModule { }