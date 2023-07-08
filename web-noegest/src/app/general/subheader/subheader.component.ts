import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit{
 bgcolor = "fond-sombre"
 urlactive = "sorties"

 ngOnInit(): void {
   this.SetBgcolor("")
 }

 SetBgcolor(url:string):void{
  if (url.length < 2) {
    this.bgcolor="fond-sombre"
  } else {
    this.bgcolor = "fond-ecran"
  }
}
}
