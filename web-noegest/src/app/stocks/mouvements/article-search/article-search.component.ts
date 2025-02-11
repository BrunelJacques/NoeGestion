import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, map, take } from 'rxjs';
import { ArticleNom, ArtsResponse as ArtsRetour } from '../../_models/article';
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
  articles!: ArticleNom[]
  kwds = {
    items:this.articles.map(x => x.nom), 
    selectedItem:"", 
    width: ""
  }

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
      map(data => data['articlesNom'])
    )
    .subscribe(
      (data: ArtsRetour) => {
        if (data) {
          this.articles = data.results
          console.log('ARticles:',this.articles)
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
