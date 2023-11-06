import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ici les sous modules
import { GeneralModule } from './general/general.module';
import { SharedModule } from './shared/shared.modules';
import { StocksModule } from './stocks/stocks.module';
import { ZzTestComponent } from './zz-test/zz-test.component';

@NgModule({
  declarations: [
    AppComponent,
    ZzTestComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule, // contient BrowserModule à ne charger qu'une seule fois
    GeneralModule, // reprend les declarations 'general' 
    SharedModule,
    StocksModule,
  ],
  bootstrap: [AppComponent
  ]
})
export class AppModule {}


