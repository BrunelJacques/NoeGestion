import { Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-repas',
  templateUrl: './repas.component.html',
  styleUrls: ['./repas.component.css']
})
export class RepasComponent  implements OnInit, OnChanges {
  repasForm!: FormGroup;

  @Input() repas = '';
  ngOnChanges(){
    if (this.repasForm) {
      this.repasForm.patchValue({
        repas: this.repas,
      });
    }
  }

  @Output() changed = new EventEmitter<string>();
  onChange(repas: string) {
    this.changed.emit(repas)
  }
  
  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.repasForm = this.formBuilder.group({
      repas: ['', Validators.required],
    });

    this.repasForm.get("repas").valueChanges.subscribe(x => {
      this.onChange(x) ;
    });
  }

}


