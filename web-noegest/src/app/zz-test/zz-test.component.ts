import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Article, ArtsRetour } from '../stocks/_models/article';
import { Autocomplete } from '../stocks/_models/params';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../constantes';

@Component({
  selector: 'app-zz-test',
  templateUrl: './zz-test.component.html',
  styleUrls: ['./zz-test.component.scss']
})

export class ZzTestComponent implements OnInit{

  @Input() article!: Article;
  @Output() retour: EventEmitter<Article> = new EventEmitter();

  private articlesUrl = this.cst.STARTICLE_URL
  private articles!: Article[]
  autocomplete: Autocomplete = { items$: new BehaviorSubject<string[]>(['un', 'deux']), selectedItem: '', width: '' };

  constructor(
    private cst: Constantes,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.searchArticles('a')
      .pipe(
        tap(x => console.log('retour searchArticles', x)),
        map(x => this.articles = x)
      )
      .subscribe(); // This will execute the Observable
    console.log('init articles:', this.articles)
  }

  searchArticles(term: string): Observable<Article[]> {
    const url = this.articlesUrl + "?nom=" + term
    console.log('appel http get url', url)
    return this.http.get<ArtsRetour>(url)
      .pipe(
        tap(x => console.log('search tap:', x)),
        map(x => x.results)
      );
  }

}
