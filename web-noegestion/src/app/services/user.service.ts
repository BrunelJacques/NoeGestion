import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  about: string;
}

const fakeData = {
  id: 0,
  firstName: 'Cory',
  lastName: 'Rylan',
  about: 'Web Developer'
};


@Injectable()

export class UserService {
  constructor() {}

  loadData() {
    return fakeData;
  }
  loadUser() {
    return of<User>(fakeData).pipe(
      delay(1000)
    );
  }
}
