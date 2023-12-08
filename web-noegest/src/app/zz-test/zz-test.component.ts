import { AfterViewInit, Component, OnInit } from '@angular/core';
import { delay, fromEvent, map, scan, tap, throttleTime } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-zz-test',
  templateUrl: './zz-test.component.html',
  styleUrls: ['./zz-test.component.scss']
})
export class ZzTestComponent implements OnInit, AfterViewInit {

  valeurInput = 'mon input'
  isDisabled = true
  isBusy = false

  clickCount!: number

  mainForm!: FormGroup;
  myTxtCtrl!: FormControl;
  myDateCtrl!: FormControl;

  constructor (
    private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    console.log("ngOninit zztest")
    this.initForm()
    this.initObservables()
  }

  initForm(): void {
    this.myTxtCtrl = this.formBuilder.control('invite',Validators.required)
    this.myDateCtrl = this.formBuilder.control('',Validators.required)
    this.mainForm = this.formBuilder.group({
      myTxt: this.myTxtCtrl,
      myDate: this.myDateCtrl
    })
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit zztest")
    
  }

  initObservables() {
    const element = document.getElementById('myButton');

    if (element) {
      fromEvent(element, 'click')
        .pipe(
          map((event) => event),
          // scan crée un index interne
          scan((count) => count + 1, 0),
          tap((count) => console.log(`delay reçoit : ${count}`)),
          // delay retient avant d'envoyer seulement le dernier arrivé
          delay(2000),
          tap((count) => console.log(`delay lache : ${count}`)),
          // ignore les répétitions non séparées de 1.5 secondes
          throttleTime(1500),
          map((count) => {
            this.clickCount = count;
            console.log(`Clicked ${count} times`);
          })
        )
        .subscribe();
    }
  }

  desactiverInput() {
    this.isBusy = !this.isBusy;
  }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est obligatoire'
    } else {return "Saisie non valide"}
  }

}
  
  