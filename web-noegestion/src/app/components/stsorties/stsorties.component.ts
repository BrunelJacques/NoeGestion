import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorties',
  templateUrl: './stsorties.component.html',
  styleUrls: ['./stsorties.component.scss']
})
export class StSortiesComponent implements OnInit {

  constructor() { }
  jour : Date = new Date();
  origine: String = "Cuisine"
  ngOnInit(): void {
  }

}
