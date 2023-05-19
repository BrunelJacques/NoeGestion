import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { UtilsRoutingModule } from './utils-routing.module';
import { InputDateComponent } from './input-date';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UtilsRoutingModule,
    ],
    declarations: [
        InputDateComponent,
    ],
    providers: [DatePipe]
})
export class UtilsModule { }