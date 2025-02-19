import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map,  of, Subject, takeUntil } from 'rxjs';
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
  autocomplete: Autocomplete = { items$: new BehaviorSubject<string[]>(['un', 'deux']), selectedItem: '', width: '' };
  private destroy$ = new Subject<void>();

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
    console.log('selected: ',item)
  }

  onModified(item: string): void {
    let itemsArray: string[] = []
    this.autocomplete.items$
      .pipe( takeUntil(this.destroy$))
      .subscribe(items => {
        itemsArray = items;
      })
    const ix = itemsArray.indexOf(item)
    console.log('Modified: ', ix, item)
    this.searchNoms(item)
  }


  searchNoms(term: string): void {
    //console.log('lets find nomsArticles:', term);
    this.articleService.searchArticlesNom(term)
      .pipe(
        takeUntil(this.destroy$),
        map(results => results.map(article => article.nom))
      )
      .subscribe(items => {
        (this.autocomplete.items$ as BehaviorSubject<string[]>).next(items);
      });
  }

}

