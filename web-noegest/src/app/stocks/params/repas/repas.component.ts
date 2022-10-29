import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-repas',
  templateUrl: './repas.component.html',
  styleUrls: ['./repas.component.less']
})
export class RepasComponent  implements OnInit {
  repasForm!: FormGroup;

  @Input() repas: string;
  @Output() repasChange = new EventEmitter<string>();
  
  onChange(){
    this.repasChange.emit(this.repas)
  }
 
  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.repasForm = this.formBuilder.group({
      repas: [this.repas, Validators.required],
    });

  }
}


