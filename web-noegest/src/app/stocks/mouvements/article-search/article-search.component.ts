import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map,  of, Subject, takeUntil, tap } from 'rxjs';
import { Article, ArticleNom } from '../../_models/article';
import { ArticleService } from '../../_services/article.service';
import { Autocomplete } from '../../_models/params';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})

export class ArticleSearchComponent implements OnInit, OnDestroy {

  @Input() article!: Article;
  @Output() retour:EventEmitter<Article> = new EventEmitter();

  searchBox!: ElementRef
  autocomplete: Autocomplete = { items$: new BehaviorSubject<string[]>(['un', 'deux']), selectedItem: '', width: '' };
  private destroy$ = new Subject<void>();
  private nomsArray : ArticleNom[] = []

  constructor(
    private articleService: ArticleService,
    ) {}

  ngOnInit(): void {
    // pour affichage de la valeur initiale
    if (this.article) {
      this.autocomplete.selectedItem = this.article.nom
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  onSelected(item: string) {
    const ix = this.getIndexItem(item)
    console.log('selected: ', ix, item)
    if (ix >= 0) {
      this.articleService.getArticle(2)
    }
  }

  onModified(item: string): void {
    const ix = this.getIndexItem(item)
    console.log('Modified: ', ix, item)
    this.searchNoms(item)
  }

  getIndexItem(item: string) {
    let itemsArray: string[] = []
    this.autocomplete.items$
      .pipe( takeUntil(this.destroy$))
      .subscribe(items => {
        itemsArray = items;
      })
    return itemsArray.indexOf(item)
  }

  // appelle un lot de noms d'articles contenant 'term'
  searchNoms(term: string): void {
    this.articleService.searchArticlesNom(term)
      .pipe(
        takeUntil(this.destroy$),
        tap(results => this.nomsArray = results),
        map(results => results.map(article => article.nom))
      )
      .subscribe(items => {
        (this.autocomplete.items$ as BehaviorSubject<string[]>).next(items);
      });
  }

}

