import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of, Subscription, take } from 'rxjs';
import { ArticleNom, ArtsNomRetour} from '../../_models/article';
import { Article } from '../../_models/article';
import { ArticleService } from '../../_services/article.service';
import { Autocomplete } from '../../_models/params';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient,
  ) {}


  ngOnInit(): void {
    if (this.articlesNom){ 
      this.kwds.items = this.articlesNom.map(x => x.nom)
    }
    if (this.article) { 
      this.kwds.selectedItem = this.article.nom 
    }
  }


  onArticle(item: string): void {
    const ix = this.kwds.items.indexOf(item)
    if (ix != -1) {
      const idArticle = this.articlesNom[ix].id
      console.log(item, ix, idArticle)
      this.articleService.getArticle(idArticle).pipe(
        take(1)
      ).subscribe((item) => {
        this.retour.emit(item)})
    } else { this.searchArticlesNom(item) }
  }

  searchArticlesNom(term: string) {
    const url = 'http://localhost:8000/api/starticlenom';
    console.log('search articleNom',url)
    this.http.get<ArtsNomRetour>(url)
      .subscribe(
        response => {
        this.kwds.items = response.results.map(article => article.nom);

        //this.filteredItems = new Observable(observer => observer.next(this._filter(term)));
      });
    }
      
  

}

