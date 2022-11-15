import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MvtService } from '../_services/mvt.service';
import { Camp } from '../_models/camp';
import { Params } from '../_models/params';
import { first } from 'rxjs';
import { AlertService } from '@app/general/_services';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.less'],
  providers: [DatePipe,]
})
export class ParamsComponent implements OnInit {
  closeResult = '';
  repas = "";
  origine = "";
  camp = "";
  camps: Camp[] = [];
  paramsForm!: FormGroup;
  jour = "";
  lstrepas = [
    { code: "matin", libelle: "repas du matin" },
    { code: "midi", libelle: "repas de midi" },
    { code: "soir", libelle: "repas du soir" },
    { code: "",  libelle: "non précisé" },
  ];
  params: any
  lstparams: Params[] = []
  loading = false

  constructor(
    private mvtService: MvtService,
    //private paramsService: ParamsService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private location: Location,
    private alertService: AlertService,
  ){
    this.getParams();
  }

  onOrigineChange(neworigine: any) {
    this.origine = neworigine.target.value
  }

  ngOnInit(): void {
    this.getParams();
    this.getCamps();
    this.paramsForm = this.formBuilder.group({
    });
  }

  okBack(): void {
    this.params.jour = new Date(this.paramsForm.value.jour),
    this.params.origine = this.paramsForm.value.origine,
    this.params.camp = this.paramsForm.value.camp,
    this.params.tva = this.paramsForm.value.tva,
    this.params.repas = this.paramsForm.value.repas
    this.setParams()
    this.goBack()
  }

  onSubmitForm(){
    this.okBack()
  }

  goBack(): void {
    this.params.location.back();
  }

  setParams(): void {
    this.loading = true;
    this.mvtService.setParams(this.paramsForm.value)
        .pipe(first())
        .subscribe({
            next: () => {
              this.jour= this.datePipe.transform(this.params.jour, 'yyyy-MM-dd'),
              this.camp= this.params.camp,
              this.repas= this.params.repas,
              //this.tva= this.params.tva,
              this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                //this.router.navigate(['../login'], { relativeTo: this.route });
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
        });
  }

  getParams(): void {
    this.mvtService.getParams()
      .subscribe({
        next: (data) => {
          this.lstparams = data;
        },
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      })
  }


  getCamps(): void {
    this.mvtService.getCamps()
      .subscribe({
        next: (data) => {
          this.camps = data;
        },
        error: (e) => {
          if (e != 'Not Found') {
            console.error(e)
          }
        }
      })
  }
}
