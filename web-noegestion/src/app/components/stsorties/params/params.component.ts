import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PARAMS } from 'src/app/models/params';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ParamsValidator } from 'src/app/services/params.validator';

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
    this.repas = this.params.service
  }

  onOrigineChange(neworigine: any) {
    this.origine = neworigine.target.value
  }

  ngOnInit(): void {
    this.paramsForm = this.formBuilder.group({
      jour: this.datePipe.transform(this.params.jour, 'yyyy-MM-dd'),
      origine: this.params.origine,
      camp: this.params.camp,
      service: [this.params.service,],
      tva: [this.params.tva, Validators.required],
    },
    // NOTE Validateur de haut niveau
    { validator : ParamsValidator.campValidator });
  }

  okBack(): void {
    this.params.jour = new Date(this.paramsForm.value.jour),
    this.params.origine = this.paramsForm.value.origine,
    this.params.camp = this.camp,
    this.params.tva = this.paramsForm.value.tva,
    this.params.service = this.paramsForm.value.repas,
    this.goBack()
  }
  onSubmitForm(){
    this.okBack()
  }

  goBack(): void {
    console.log(this.params )
    this.params.service = this.paramsForm.value.repas,
    this.location.back();
  }
}
