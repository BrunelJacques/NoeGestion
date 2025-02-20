import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Article, ArticleNom ,ArtsNomRetour, ArtsRetour} from '../_models/article';
import { HandleError } from 'src/app/general/_helpers/error.interceptor';
import { Constantes } from 'src/app/constantes';
import { ActivatedRoute } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ArticleService {

  articlesUrl = this.cst.STARTICLE_URL
  articlesNomUrl = this.cst.STARTICLE_NOM_URL
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  articlesNom$!: Observable<ArticleNom[]>;
    
  constructor(
    private cst: Constantes,
    private http: HttpClient,
    private handleError: HandleError,
    private activatedRoute: ActivatedRoute,
  ){
    this.articlesNom$ = this.activatedRoute.data
    .pipe(map(data => data['']))
    console.log('article.service articleNom$', this.articlesNom$)
  }

  /** GET article by id. Will 404 if id not found */
  getArticle(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;
    console.log('appel url',url)
    return this.http.get<Article>(url)
    .pipe(
      tap(x => x ?
        this.handleError.log(`fetched article id=${id}`):
        this.handleError.log(`Pas d'article id = "${id}"`)
      ),
      catchError(this.handleError.handleError<Article>(`getArticle id=${id}`)),
    );
  }

  /* GET articles whose nom contains search term */
  searchArticles(term: string) : Observable<Article[]>{
    const url = this.articlesUrl + "?nom=" + term  
    console.log('searchArticles url',url)
    if (!term.trim()) {
      // if not search term, return empty article array.
      return of([]);
    }
    return this.http.get<ArtsRetour>(url)
    .pipe(
      tap(x => x ?
         this.handleError.log(`Trouvés ${x.count} articles matching "${term}"`) :
         this.handleError.log(`Pas d'articles matching "${term}"`)),
      catchError(this.handleError.handleError<ArtsRetour>('article',{ count: 0, results: [] })),
      map(x => x.results)
    )
  }

  /* GET articles whose nom contains search term */
  searchArticlesNom(term: string) : Observable<ArticleNom[]> {
    const url = this.articlesNomUrl + '?nom=' + term;
    return this.http.get<ArtsNomRetour>(url)
    .pipe(
      tap(x => x.results ?
        this.handleError.log(`fetched getArticlesNom ${x.count} items`) :
        this.handleError.log(`get ArticlesNom no items fetched`)),
      catchError(this.handleError.handleError<ArtsNomRetour>('getArticlesNom', { count: 0, results: [] })),
      map(x => x.results)
    );
  }

  //////// Save methods //////////

  /** POST: add a new article to the server */
  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.articlesUrl, article, this.httpOptions).pipe(
      tap((newArticle: Article) => this.handleError.log(`added article w/ id=${newArticle.id}`)),
      catchError(this.handleError.handleError<Article>('addArticle'))
    );
  }

  /** DELETE: delete the article from the server */
  deleteArticle(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;

    return this.http.delete<Article>(url, this.httpOptions)
      .pipe(
        tap(() => this.handleError.log(`deleted article id=${id}`)),
        catchError(this.handleError.handleError<Article>('deleteArticle'))
      );
  }

  /** PUT: update the article on the server */
  updateArticle(article: Article): Observable<unknown> {
    return this.http.put(this.articlesUrl, article, this.httpOptions)
      .pipe(
        tap(() => this.handleError.log(`updated article id=${article.id}`)),
        catchError(this.handleError.handleError<unknown>('updateArticle'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - nom of the operation that failed
   * @param result - optional value to return as the observable result
   */



}
