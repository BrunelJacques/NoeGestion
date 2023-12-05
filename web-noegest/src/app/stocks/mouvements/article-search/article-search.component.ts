import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, map, take } from 'rxjs';
import { ArticleNom } from '../../_models/article';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../_models/article';
import { ArticleService } from '../../_services/article.service';


@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})

export class ArticleSearchComponent implements OnInit {

  @Input() article!: Article;
  @Output() retour:EventEmitter<Article> = new EventEmitter();

  articleNom$!: Observable<ArticleNom[]>;

  private searchTerms = new Subject<string>();
  searchBox!: ElementRef
  items!: string[]
  articles!: ArticleNom[]
  kwds = {items:this.items, selectedItem:"", width: ""}

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) {}

  search(term:string): void {
    this.searchTerms.next(term)
  }

  ngOnInit(): void {
    // appel du début du fichier des articles via resolver articles
    this.articleNom$ = this.route.data.pipe(
      map(data => data['articlesNom'])
    )
    this.articleNom$.subscribe((articles) => {
      this.items = articles.map((article) => article.nom );
      this.articles = articles
    });
    this.kwds = {items:this.items, selectedItem:this.article.nom, width: "300px"}
  }

  onArticle(nomArticle: string): void {
    const ix = this.items.findIndex((item) => item === nomArticle)
    const idArticle = this.articles[ix].id
    this.articleService.getArticle(idArticle).pipe(
      take(1)
    ).subscribe((article) => {
      this.retour.emit(article)})
  }

}
