import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-repas',
  templateUrl: './repas.component.html',
  styleUrls: ['./repas.component.css']
})
export class RepasComponent  implements OnInit {
  repasForm!: FormGroup;
  @Input() repas = 'orig';

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.repasForm = this.formBuilder.group({
      repas: ['', Validators.required],
    });
  }

}


