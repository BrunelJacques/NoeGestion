import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, map, take } from 'rxjs';
import { ArticleNom, ArtNomsRetour as ArtsRetour } from '../../_models/article';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../_models/article';
import { ArticleService } from '../../_services/article.service';
import { Kwds as Autocomplete } from '../../_models/params';

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
  articles!: ArticleNom[]
  kwds: Autocomplete = { items: [], selectedItem: '', width: '' };

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) {}


  ngOnInit(): void {
    this.getArticlesNom();
    if (this.articles){ this.kwds.items = this.articles.map(x => x.nom)}
    if (this.article) { this.kwds.selectedItem = this.article.nom }
  }

  getArticlesNom():void {
    // appel du fichier des articles via resolver articles
    this.articlesNom$ = this.route.data.pipe(
      map(data => data['articlesNom'])
    )
    .subscribe(
      (data: ArtsRetour) => {
        if (data) {
          this.articles = data.results
        }
      }
    );
  }

  onArticle(nomArticle: string): void {
    console.log(nomArticle)
    const ix = this.articles.findIndex((nomArticle) => nomArticle === nomArticle)
    const idArticle = this.articles[ix].id
    this.articleService.getArticle(idArticle).pipe(
      take(1)
    ).subscribe((article) => {
      this.retour.emit(article)})
  }

}
