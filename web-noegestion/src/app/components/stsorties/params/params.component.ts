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
  params = PARAMS;
  closeResult = '';
  repas = "";
  origine = "";
  camp = "";
  paramsForm!: FormGroup;
  jour = ""

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private location: Location,
  ) {
    this.location = location
    this.origine = this.params.origine
    this.camp = this.params.camp

  }

  onRepasChange(newrepas: any) {
    this.repas = newrepas.target.value
  }

  onOrigineChange(neworigine: any) {
    this.origine = neworigine.target.value
  }

  ngOnInit(): void {
    this.paramsForm = this.formBuilder.group({
      jour: this.datePipe.transform(this.params.jour, 'yyyy-MM-dd'),
      origine: this.params.origine,
      camp: this.params.camp,
      tva: this.params.tva,
      })
  }

  okBack(): void {
    this.params.jour = new Date(this.paramsForm.value.jour),
    this.params.origine = this.paramsForm.value.origine,
    this.params.camp = this.camp,
    this.params.tva = this.paramsForm.value.tva,
    this.params.repas = this.repas,
    this.goBack()
  }

  goBack(): void {
    this.location.back();
  }
}
