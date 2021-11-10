import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AuthGuard } from './components/general/guards/auth.guard';
import { LoginComponent } from './components/general/login/login.component';
import { StSortiesComponent } from './components/stsorties/stsorties.component';
import { HomeComponent } from './components/general/home/home.component';
import { StsortieComponent } from './components/stsorties/stsortie/stsortie.component';
import { StEntreesComponent } from './components/stentrees/stentrees.component';
import { StEffectifsComponent } from './components/steffectifs/steffectifs.component';
import { StInventaireComponent } from './components/stinventaire/stinventaire.component';
import { StPrixJourneeComponent } from './components/stprixjournee/stprixjournee.component';
import { KmArriveeComponent } from './components/kmarrivee/kmarrivee.component';
import { KmDepartComponent } from './components/kmdepart/kmdepart.component';
import { StFiltresComponent } from './components/stfiltres/stfiltres.component';


const routes: Routes = [
  
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'stocks',
    component: StSortiesComponent
  },
  {
    path: 'km',
    component: KmDepartComponent
  },  {
    path: 'sorties',
    component: StSortiesComponent,
  },
  {
    path: 'sortie',
    component: StsortieComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'zzlogin',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'entrees',
    component: StEntreesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'effectifs',
    component: StEffectifsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inventaire',
    component: StInventaireComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'prixjournees',
    component: StPrixJourneeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'depart',
    component: KmDepartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'arrivee',
    component: KmArriveeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'filtres',
    component: StFiltresComponent,
    canActivate: [AuthGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
