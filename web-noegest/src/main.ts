/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
//import { appConfig } from './app/app.config'; mis après AppComponent
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
