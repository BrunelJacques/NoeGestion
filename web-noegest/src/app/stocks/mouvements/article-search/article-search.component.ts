import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map,   Subject, takeUntil, tap } from 'rxjs';
import { Article, ArticleNom } from '../../_models/article';
import { ArticleService } from '../../_services/article.service';
import { Autocomplete } from '../../_models/params';
import { AutocompleteComponent } from '../../../shared/autocomplete/autocomplete.component';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss'],
  imports: [AutocompleteComponent]
})

export class ArticleSearchComponent implements OnInit, OnDestroy {

  @Input() article!: Article;
  @Output() retour = new EventEmitter<Article>();

  searchBox!: ElementRef
  autocomplete: Autocomplete = { items$: new BehaviorSubject<string[]>(['un', 'deux']), selectedItem: '', width: '' };
  private destroy$ = new Subject<void>();
  private articlesNoms : ArticleNom[] = []

  constructor(
    private articleService: ArticleService,
    ) {}

  ngOnInit(): void {
    // pour affichage de la valeur initiale

    if (!this.article) {
      this.articleService.searchArticles('*')
    }
    this.autocomplete.selectedItem = this.article.nom
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
    console.log('selected: ', id, item, this.article.nom)
    if (ix >= 0) {
      this.articleService.getArticle(id)
      .pipe(
        map(x => {
          this.retour.emit( x );
          console.log('emit: ', this.article.nom)
        })
      )
    }
  }

}

