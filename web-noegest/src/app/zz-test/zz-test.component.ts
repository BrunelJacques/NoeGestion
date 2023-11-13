import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zz-test',
  templateUrl: './zz-test.component.html',
  styleUrls: ['./zz-test.component.scss']
})
export class ZzTestComponent implements OnInit {

  ngOnInit(): void {
    const myArray: unknown[] = ["10", 2, 3, 4];

// Add a new item (e.g., 0) at the beginning of the array
myArray.splice(0,0,"deb0");

console.log(myArray); // Output: [0, 1, 2, 3, 4]
  }
}
