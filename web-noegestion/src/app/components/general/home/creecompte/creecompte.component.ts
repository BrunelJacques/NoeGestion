import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService, User } from '../../../../services/user.service';


@Component({
  selector: 'app-creecompte',
  templateUrl: './creecompte.component.html',
  styleUrls: ['./creecompte.component.scss']
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

  
  okBack(): void {
    this.goBack()
  }
  onSubmitForm(){
    this.okBack()
  }

  goBack(): void {
  }

  submit() {
    console.log("coucou clic")
    if (this.form.valid) {
      this.origine.firstName = this.form.value.firstName;
      console.log(this.origine.firstName);

    }
  }
}

