import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PARAMS } from 'src/app/models/params';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  jour= new Date();

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
  ) {
    this.location = location
    console.log(location)
  }

  onRepasChanged(newrepas: string) {
    this.repas = newrepas
  }

  ngOnInit(): void {
    this.paramsForm = this.formBuilder.group({
      jour: this.jour,
      origine: "",
      camp: "",
      repas: "",
      fournisseur: "",
      tva: "",
    })
  }

  goBack(): void {
    this.location.back();
  }
}
