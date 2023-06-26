import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  title = "URL not found : ";
  urlOrigine = ''
  constructor(private router: Router) {}

  ngOnInit() {
    this.urlOrigine = this.router.url;
    console.log(this.router.url);        
    }
}

