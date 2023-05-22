export class User {
    refresh?:string;
    access?:string;
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    groups?: [string];
    jwtToken?: string;
}
