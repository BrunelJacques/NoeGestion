export class User {
    id!: string;
    username!: string;
    email!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    token!: string;
}

export interface LoggedInUser {
    id: number,
    token: string,
    username: string
  }

export interface UserCredentials {
    username: string,
    password: string
  }
 
export class ChoixAppli {
    value!: string;
}
 
 