import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-test',
  imports: [RouterOutlet, CommonModule ],
  templateUrl: `./test.component.html`
})

export class TestComponent {

}
