import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AuthGuard } from './components/general/guards/auth.guard';
import { LoginComponent } from './components/general/login/login.component';
import { StSortiesComponent } from './components/stsorties/stsorties.component';
import { HomeComponent } from './components/general/home/home.component';
import { SortieComponent } from './components/stsorties/sortie/sortie.component';
import { StEntreesComponent } from './components/stentrees/stentrees.component';
import { StEffectifsComponent } from './components/steffectifs/steffectifs.component';
import { StInventaireComponent } from './components/stinventaire/stinventaire.component';
import { StPrixJourneeComponent } from './components/stprixjournee/stprixjournee.component';
import { KmArriveeComponent } from './components/kmarrivee/kmarrivee.component';
import { KmDepartComponent } from './components/kmdepart/kmdepart.component';
import { StParamsComponent } from './components/stsorties/stparams/stparams.component';
import { MessagesComponent } from './components/general/messages/messages.component';


const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'stocks', component: StSortiesComponent },
  { path: 'km', component: KmDepartComponent },  
  { path: 'sorties', component: StSortiesComponent, },
  { path: 'sortie', component: SortieComponent, canActivate: [AuthGuard] },
  { path: 'sortie/:id', component: SortieComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'entrees', component: StEntreesComponent, canActivate: [AuthGuard] },
  { path: 'effectifs', component: StEffectifsComponent, canActivate: [AuthGuard] },
  { path: 'inventaire', component: StInventaireComponent, canActivate: [AuthGuard] },
  { path: 'prixjournees', component: StPrixJourneeComponent, canActivate: [AuthGuard] },
  { path: 'depart', component: KmDepartComponent, canActivate: [AuthGuard] },
  { path: 'arrivee', component: KmArriveeComponent, canActivate: [AuthGuard] },
  { path: 'params', component: StParamsComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
