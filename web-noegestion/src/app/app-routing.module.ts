import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AuthGuard } from './guards/auth.guard';
import { StSortiesComponent } from './components/stsorties/stsorties.component';
import { StEntreesComponent } from './components/stentrees/stentrees.component';

const routes: Routes = [
  {
    path: 'sorties',
    component: StSortiesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'entrees',
    component: StEntreesComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
