import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService, User } from '../../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  form!: FormGroup;
  user!: Observable<User>;
  origine!: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      about: []
    });

    this.origine = this.userService.loadData();

    this.user = this.userService.loadUser().pipe(
      tap(user => this.form.patchValue(user))
    );   
    


  }

  submit() {
    console.log("coucou clic")
    if (this.form.valid) {
      this.origine.firstName = this.form.value.firstName;
      console.log(this.origine.firstName);

    }
  }
}

