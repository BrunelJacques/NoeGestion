import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Article } from '../_models/article';
import { HandleError } from 'src/app/general/_helpers/error.interceptor';
import { Constantes } from 'src/app/constantes';

@Injectable({providedIn: 'root'})
export class ArticleService {

  articlesUrl = this.cst.STARTICLE_URL
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
  constructor(
    private cst: Constantes,
    private http: HttpClient,
    private handleError: HandleError,
  ){}

  /** GET articles from the server */
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl)
      .pipe(
        tap(_ => this.handleError.log('fetched articles')),
        catchError(this.handleError.handleError<Article[]>('getArticles', []))
      );
  }

  /** GET article by id. Return `undefined` when id not found */
  getArticleNo404<Data>(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/?id=${id}`;
    return this.http.get<Article[]>(url)
      .pipe(
        map(articles => articles[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.handleError.log(`${outcome} article id=${id}`);
        }),
        catchError(this.handleError.handleError<Article>(`getArticle id=${id}`))
      );
  }

  /** GET article by id. Will 404 if id not found */
  getArticle(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;
    return this.http.get<Article>(url).pipe(
      tap(_ => this.handleError.log(`fetched article id=${id}`)),
      catchError(this.handleError.handleError<Article>(`getArticle id=${id}`))
    );
  }

  /* GET articles whose nom contains search term */
  searchArticles(term: string) {
    const url = this.articlesUrl + '?nom=' + term 
    console.log(url)
    if (!term.trim()) {
      // if not search term, return empty article array.
      return of([]);
    }
    return this.http.get<Article[]>(url)
    .pipe(
      tap(x => x ?
         this.handleError.log(`found articles matching "${term}"`) :
         this.handleError.log(`no articles matching "${term}"`)),
      catchError(this.handleError.handleError<Article[]>('searchArticles',[]))
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

    return this.http.delete<Article>(url, this.httpOptions).pipe(
      tap(_ => this.handleError.log(`deleted article id=${id}`)),
      catchError(this.handleError.handleError<Article>('deleteArticle'))
    );
  }

  /** PUT: update the article on the server */
  updateArticle(article: Article): Observable<any> {
    return this.http.put(this.articlesUrl, article, this.httpOptions).pipe(
      tap(_ => this.handleError.log(`updated article id=${article.id}`)),
      catchError(this.handleError.handleError<any>('updateArticle'))
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