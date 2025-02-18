import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { map,  of, Subject, takeUntil } from 'rxjs';
import { Article } from '../../_models/article';
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
  autocomplete: Autocomplete = { items$: of(['quatre','cinq','six']), selectedItem: 'cinq', width: '' };
  private destroy$ = new Subject<void>();

  constructor(
    private articleService: ArticleService,
    ) {}

  ngOnInit(): void {
    if (this.article) {
      this.autocomplete.selectedItem = this.article.nom
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  onArticle(item: string): void {
    let itemsArray: string[] = []
    this.autocomplete.items$
      .pipe( takeUntil(this.destroy$))
      .subscribe(items => {
        itemsArray = items;
        console.log('Items array:', itemsArray)
      })
    const ix = itemsArray.indexOf(item)
    console.log('index article: ', ix)
    this.searchArticlesNom(item)
  }

  searchArticlesNom(term: string) {
    this.articleService.searchArticlesNom(term)
    .pipe(
      takeUntil(this.destroy$),
      map(results => results.map(article => article.nom))
    )
    .subscribe(
      items => {
        const itemsArrayConstant: string[] = items.flat(); // flat() to flatten the nested array if necessary
        console.log('Items array constant:', itemsArrayConstant)
      }
    )
  }

}

