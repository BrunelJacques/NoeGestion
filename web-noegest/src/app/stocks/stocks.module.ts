import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.modules';
import { StocksRoutingModule } from './stocks-routing.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StocksRoutingModule,
    SharedModule,
  ],

})

export class StocksModule { }
