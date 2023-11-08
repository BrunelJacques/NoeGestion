import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { ArticleNom } from '../../_models/article';
import { ArticleService } from '../../_services/article.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})

export class ArticleSearchComponent implements OnInit {
  articleNom$!: Observable<ArticleNom[]>;

  private searchTerms = new Subject<string>();
  searchBox!: ElementRef
  items!: string[] 
  kwds = {items:this.items, width: ""}

  constructor( 
    private route: ActivatedRoute

  ) {}

  search(term:string): void {
    this.searchTerms.next(term)
  }

  ngOnInit(): void {
    this.articleNom$ = this.route.data.pipe(
      map(data => data['onesortie'])
    )
    this.articleNom$.subscribe(articles => {
      this.items = articles.map(article => article.nom );
      this.kwds = {items:this.items, width: "300px"}
    });

  }


}
