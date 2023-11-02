import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap
} from 'rxjs/operators';
import { Article } from '../../_models/article';
import { ArticleService } from '../../_services/article.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})

export class ArticleSearchComponent implements OnInit {
  article$!: Observable<Article[]>;
  private searchTerms = new Subject<string>();
  searchBox!: ElementRef
  hideResult = false;
  searchTerm = "";
  options!: Article[];

  constructor( 
    private articleService: ArticleService,
    private route: ActivatedRoute

  ) {}

  search(term:string): void {
    this.hideResult = false
    this.searchTerms.next(term)
  }

  ngOnInit(): void {
    this.article$ = this.route.data.pipe(
      map(data => data['onesortie'])
    )
    //this.connectData()
  }

  // pour une recherche des articles partielle selon la saisie
  connectData(): void {
    this.article$ =  this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string
        ) => this.articleService.searchArticles(term)
          ),
    );
  }

  hideList(article: Article) {
    console.log(article.nom)
    this.hideResult = true;
  }

}
