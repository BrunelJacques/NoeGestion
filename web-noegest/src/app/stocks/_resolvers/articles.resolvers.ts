import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ArticleNom } from '../_models/article';
import { ArticleService } from '../_services/article.service';
import { Observable } from 'rxjs';


export const ArticlesNomResolver: ResolveFn<ArticleNom[]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  articleService: ArticleService = inject(ArticleService) 
): Observable<ArticleNom[]> => articleService.getArticlesNom()
