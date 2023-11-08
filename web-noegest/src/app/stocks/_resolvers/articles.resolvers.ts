import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Article, ArticleNom } from '../_models/article';
import { ArticleService } from '../_services/article.service';
import { Observable } from 'rxjs';

export const ArticlesResolver: ResolveFn<Article[]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  articleService: ArticleService = inject(ArticleService) 
): Observable<Article[]> => articleService.getArticles()

export const ArticlesNomResolver: ResolveFn<ArticleNom[]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  articleService: ArticleService = inject(ArticleService) 
): Observable<ArticleNom[]> => articleService.getArticlesNom()
