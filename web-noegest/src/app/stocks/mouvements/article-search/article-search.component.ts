import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { map,  of, Subject, Subscription, takeUntil } from 'rxjs';
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

  destroy$!:Subject<boolean> 
  articlesSubscrib!:Subscription
  items: string[] = [];
  searchBox!: ElementRef;
  autocomplete: Autocomplete = { items: [], selectedItem: '', width: '' };

  constructor(
    private articleService: ArticleService,
  ) {this.initSubscriptions()}


  ngOnInit(): void {
    if (this.article) { 
      this.autocomplete.selectedItem = this.article.nom 
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }

  initSubscriptions() {
    this.destroy$ = new Subject<boolean>()
    this.articlesSubscrib = this.articleService.searchArticlesNom("")
    .pipe(
      takeUntil(this.destroy$),
      map(results => results.map(article => article.nom))
    )
    .subscribe( 
      items => {
        this.items = items.flat(); // flat() to flatten the nested array if necessary
        console.log('Items array :', this.items.flat());
      }
    )

  }

  onArticle(item: string): void {
      console.log('Items array:', item);
    };

/*
    const ix = this.items.indexOf(item)
    console.log('index article: ', ix)
    this.GetItems(item)
  }


  GetItems(term: string) {
    this.articleService.searchArticlesNom(term)
    .pipe(
      map(results => results.map(article => article.nom))
    )
    .subscribe( 
      items => {
        this.items = items.flat(); // flat() to flatten the nested array if necessary
        console.log('Items array :', this.items);
      }
    )
  }

  //this.filteredItems = new Observable(observer => observer.next(this._filter(term)));
*/      

}

