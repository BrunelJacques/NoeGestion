import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.modules';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-test',
  imports: [SharedModule, CommonModule],
  template: `
    <input matInput 
    class="form-ctrl"
    type= "date" 
    name= 'myName'
    placeholder="inputDate">
    <form [formGroup]="paramsForm" 
    class="form-group was-validated form-row"
    >
        <label for="jour">Datetest:</label>
        <input
        type= "date" 
        min="2025-04-10" max="2025-05-10"
        id="jour" 
        formControlName="jour"
        >
    </form>

  `,
  styles: ``,
  providers: [],
})


export class TestComponent {
  formBuilder = new FormBuilder
  today = new Date().toISOString().split('T')[0]; // Extract only the date part
  paramsForm = this.formBuilder.group({
    jour: [this.today], // Correct format (yyyy-MM-dd)
  });
  get f() { return this.paramsForm.controls; }
}
