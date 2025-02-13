import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { ArticleNom, ArtNomsRetour} from '../../_models/article';
import { ActivatedRoute } from '@angular/router';
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
  @Input() articlesNom!: ArticleNom[]
  @Output() retour:EventEmitter<Article> = new EventEmitter();

  articlesNom$!: Subscription;

  searchBox!: ElementRef
  kwds: Autocomplete = { items: [], selectedItem: '', width: '' };

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) {}


  ngOnInit(): void {
    //this.getArticlesNom();
    if (this.articlesNom){ this.kwds.items = this.articlesNom.map(x => x.nom)}
    if (this.article) { this.kwds.selectedItem = this.article.nom }
  }

  getArticlesNom():void {
    // appel du fichier des articles via resolver articles
    this.articleService.articlesNom$
    .pipe()
    .subscribe()
    /*
    this.articlesNom$ = this.route.data.pipe(
      map(data => data['articlesNom'])
    )
    .subscribe(
      (data: ArtsRetour) => {
        if (data) {
          this.articlesNom = data.results
        }
      }
    );*/
  }

  onArticle(nomArticle: string): void {
    console.log(nomArticle)
    const ix = this.articlesNom.findIndex((nomArticle) => nomArticle === nomArticle)
    const idArticle = this.articlesNom[ix].id
    this.articleService.getArticle(idArticle).pipe(
      take(1)
    ).subscribe((article) => {
      this.retour.emit(article)})
  }

}
