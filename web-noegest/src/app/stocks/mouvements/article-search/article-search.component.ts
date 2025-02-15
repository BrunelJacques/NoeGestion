import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map,  of, Subscription } from 'rxjs';
import { Article } from '../../_models/article';
import { ArticleService } from '../../_services/article.service';
import { Autocomplete } from '../../_models/params';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})

export class ArticleSearchComponent implements OnInit {

  @Input() article!: Article;
  @Output() retour:EventEmitter<Article> = new EventEmitter();

  articlesNom$!: Subscription;
  searchBox!: ElementRef
  autocomplete: Autocomplete = { items$: of([]), selectedItem: '', width: '' };

  constructor(
    private articleService: ArticleService,
  ) {}


  ngOnInit(): void {
    if (this.article) { 
      this.autocomplete.selectedItem = this.article.nom 
    }
  }


  onArticle(item: string): void {
    let itemsArray: string[] = [];
    this.autocomplete.items$.subscribe(items => {
      itemsArray = items;
      console.log('Items array:', itemsArray);
    });
    const ix = itemsArray.indexOf(item)
    console.log('index article: ', ix)
    this.searchArticlesNom(item)
  }


  searchArticlesNom(term: string) {
    this.articleService.searchArticlesNom(term)
    .pipe(
      map(results => results.map(article => article.nom))
    )
    .subscribe( 
      items => {
        const itemsArrayConstant: string[] = items.flat(); // flat() to flatten the nested array if necessary
        console.log('Items array constant:', itemsArrayConstant);
      }
    )
  }

  //this.filteredItems = new Observable(observer => observer.next(this._filter(term)));
      

}

