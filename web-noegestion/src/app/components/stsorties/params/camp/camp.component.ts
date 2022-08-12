import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-camp',
  templateUrl: './camp.component.html',
  styleUrls: ['./camp.component.css']
})

export class CampComponent implements OnInit {

  @Input() camp: any;
  @Output() campChange = new EventEmitter<string>();
  
  onChange(){
    this.campChange.emit(this.camp)
  }
 
  constructor(
  ) {}

  ngOnInit(): void {
    
  }

}
