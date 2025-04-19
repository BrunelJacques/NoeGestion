import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-stocks',
  imports: [RouterOutlet, CommonModule ],
  templateUrl: `./stocks.component.html`,
  styles: ``
})
export class StocksComponent {

}
