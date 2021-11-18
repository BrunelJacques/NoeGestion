import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PARAMS } from 'src/app/models/params';

@Component({
  selector: 'app-stparams',
  templateUrl: './stparams.component.html',
  styleUrls: ['./stparams.component.css']
})

export class StParamsComponent implements OnInit {
  params= PARAMS;
  closeResult = '';

  constructor(
    private location: Location,
  ) {
    this.location = location
  }
 
  ngOnInit(): void {};

  goBack(): void {
    this.location.back();
  }
}
