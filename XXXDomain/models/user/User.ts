import { Email } from '../shared/Email/Email';
import { UserID } from './UserID/UserID';
import { UserName } from './UserName/UserName';

export class User {
  private constructor(
    public userID: UserID,
    public userName: UserName,
    public email: Email
  ) {}

  static create(userID: UserID, userName: UserName, email: Email): User {
    return new User(userID, userName, email);
  }

  static recontract() {}

  changeUserName(userName: UserName): void {
    this.userName = userName;
  }

  changeEmail(email: Email): void {
    this.email = email;
  }
}

const user = User.create(
  UserID.create('aaaaaaa'),
  UserName.create('vnjvir'),
  Email.create('example@gmial.com')
);

console.log(user.email.value);
