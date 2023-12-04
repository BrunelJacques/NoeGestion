import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { ArticleNom } from '../../_models/article';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../_models/article';


@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})

export class ArticleSearchComponent implements OnInit {

  @Input() article!: Article;

  articleNom$!: Observable<ArticleNom[]>;

  private searchTerms = new Subject<string>();
  searchBox!: ElementRef
  items!: string[]
  kwds = {items:this.items, selectedItem:"", width: ""}

  constructor(
    private route: ActivatedRoute
  ) {}

  search(term:string): void {
    this.searchTerms.next(term)
  }

  ngOnInit(): void {
    // appel du début du fichier des articles via resolver articles
    this.articleNom$ = this.route.data.pipe(
      map(data => data['articlesNom'])
    )
    this.articleNom$.subscribe(articles => {
      this.items = articles.map(article => article.nom );
      this.kwds = {items:this.items, selectedItem:this.article.nom, width: "300px"}
    });
  }

}
