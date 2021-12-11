import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PARAMS } from 'src/app/models/params';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.css']
})
export class ParamsComponent implements OnInit {
  params= PARAMS;
  closeResult = '';
  repas = ""; 
  paramsForm!: FormGroup;

  constructor(
    private location: Location,
  ) {
    this.location = location
  }

  onRepasChanged(newrepas: string) {
    this.repas = newrepas
  }

  ngOnInit(): void {};

  goBack(): void {
    this.location.back();
  }
}
