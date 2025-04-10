import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map,   Subject, takeUntil, tap } from 'rxjs';
import { Article, ArticleNom } from '../../_models/article';
import { ArticleService } from '../../_services/article.service';
import { Autocomplete } from '../../_models/params';

@Component({
    selector: 'app-article-search',
    templateUrl: './article-search.component.html',
    styleUrls: ['./article-search.component.scss'],
    standalone: false
})

export class ArticleSearchComponent implements OnInit, OnDestroy {

  @Input() article!: Article;
  @Output() retour:EventEmitter<Article> = new EventEmitter();

  searchBox!: ElementRef
  autocomplete: Autocomplete = { items$: new BehaviorSubject<string[]>(['un', 'deux']), selectedItem: '', width: '' };
  private destroy$ = new Subject<void>();
  private articlesNoms : ArticleNom[] = []

  constructor(
    private articleService: ArticleService,
    ) {    if (!this.article) {
      this.articleService.searchArticles('*')
      .subscribe()
    }}

  ngOnInit(): void {
    // pour affichage de la valeur initiale
    if (!this.article) {
      this.articleService.searchArticles('*')
    } else {
      this.autocomplete.selectedItem = this.article.nom
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  onModified(item: string): void {
    const ix = this.getIndexItem(item)
    console.log('Modified: ', ix, item)
    this.searchNoms(item)
  }

  getIndexItem<T>(item: T) {
    let itemsArray: T[] = []
    this.autocomplete.items$
      .pipe( takeUntil(this.destroy$))
      .subscribe(items => {
        itemsArray = items as T[];
      })
    return itemsArray.indexOf(item)
  }

  // appelle un lot de noms d'articles contenant 'term'
  searchNoms(term: string): void {
    if (term == '') {
      term = this.article.nom.slice(0,3)
    }
    this.articleService.searchArticlesNom(term)
      .pipe(
        takeUntil(this.destroy$),
        tap(results => this.articlesNoms = results),
        map(results => results.map(article => article.nom))
      )
      .subscribe(items => {
        (this.autocomplete.items$ as BehaviorSubject<string[]>).next(items);
      });
  }

  onSelected(item: string) {
    const ix = this.getIndexItem(item)
    const id = this.articlesNoms[ix].id
    console.log('selected: ', id, item, this.article)
    if (ix >= 0) {
      this.articleService.getArticle(id)
      .pipe(
        takeUntil(this.destroy$),
        tap(x => this.article = x),
        map(x => {
          console.log('emit: ', this.article),
          this.retour.emit(x)
        })
      ).subscribe()
    }
  }

}

