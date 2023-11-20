import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zz-test',
  templateUrl: './zz-test.component.html',
  styleUrls: ['./zz-test.component.scss']
})
export class ZzTestComponent implements OnInit {

  valeurInput = 'mon input'
  isDisabled = true
  isBusy = false



    ngOnInit(): void {
      console.log("go zztest")

    }

    desactiverInput() {
      this.isBusy = !this.isBusy;
    }

}
  
  