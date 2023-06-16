import { Component } from '@angular/core';
import { AuthenticationService } from './general/_services';
import { User } from './general/_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  user!: User;
  title: unknown;

  constructor(private authenticationService: AuthenticationService) {
      this.authenticationService.user.subscribe(x => this.user = x);
  }

  logout() {
      this.authenticationService.logout();
  }
}