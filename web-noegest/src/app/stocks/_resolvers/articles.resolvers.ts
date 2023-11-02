import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Article } from '../_models/article';
import { ArticleService } from '../_services/article.service';
import { Observable } from 'rxjs';

export const ArticlesResolver: ResolveFn<Article[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  articleService: ArticleService = inject(ArticleService) 
): Observable<Article[]> => articleService.getArticles()
