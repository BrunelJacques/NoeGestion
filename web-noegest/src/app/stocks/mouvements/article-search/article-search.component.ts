import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, Subscription, map, take } from 'rxjs';
import { ArticleNom, ArtsResponse } from '../../_models/article';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../_models/article';
import { ArticleService } from '../../_services/article.service';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})

export class ArticleSearchComponent implements OnInit {

  @Input() article!: Article| undefined;
  @Output() retour:EventEmitter<Article> = new EventEmitter();

  articleNom$!: Subscription;

  searchBox!: ElementRef
  items!: string[]
  articles!: ArticleNom[]
  kwds = {items:this.items, selectedItem:"", width: ""}

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) {}


  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    // appel du début du fichier des articles via resolver articles
    this.articleNom$ = this.route.data.pipe(
      map(data => data['articlesNom']))
    .subscribe(
      (data: ArtsResponse) => {
        if (data) {
          const i = data.count
          this.articles = data.results
        }
      }
    );
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
