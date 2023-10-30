import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Article } from '../../_models/article';
import { ArticleService } from '../../_services/article.service';


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

  constructor( private articleService: ArticleService) {}

  search(term:string): void {
    this.hideResult = false
    this.searchTerms.next(term)
  }

  ngOnInit(): void {
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


  //hideList(article: Article) {
  //  this.searchBox.nativeElement
  //  this.hideResult = true;
  //}

}
