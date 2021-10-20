import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import {SortiesComponent } from './components/sorties/sorties.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'sorties',
    component: SortiesComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
