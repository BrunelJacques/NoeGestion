import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.less']
})
export class InputDateComponent {
  ArrivalDate : Date = new Date();
  DepartureDate : Date = new Date();
  dateForm = new FormGroup({
    ArrivalDate: new FormControl(this.ArrivalDate.toISOString().split("T")[0]),
    DepartureDate: new FormControl(this.DepartureDate.toISOString().split("T")[0])
  });

  onSubmit(){
    console.log(this.dateForm.value);
  }
}
