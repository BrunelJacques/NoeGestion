import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PARAMS } from 'src/app/models/params';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.css'],
  providers: [DatePipe,]
})
export class ParamsComponent implements OnInit {
  params= PARAMS;
  closeResult = '';
  repas = ""; 
  paramsForm!: FormGroup;
  dte = new Date();
  jour = ""

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private location: Location,
  ) {
    this.jour = this.datePipe.transform(this.dte, 'dd/MM/yyyy');
    this.location = location
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
    console.log (this.repas, this.params)
    this.location.back();
  }
}
