import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { SharedModule } from 'src/app/shared/shared.modules';
import { InfoComponent } from './subregister/info/info.component';
import { CompteComponent } from './subregister/compte/compte.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        SharedModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent,
        InfoComponent,
        CompteComponent
    ]
})
export class AccountModule { }