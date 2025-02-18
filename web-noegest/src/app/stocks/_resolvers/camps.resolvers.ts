import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Camp } from '../_models/params';
import { ParamsService } from '../_services/params.service';
import { Observable } from 'rxjs';


export const CampsResolver: ResolveFn<Camp[]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  paramsService: ParamsService = inject(ParamsService) 
): Observable<Camp[]> => paramsService.getCamps()
