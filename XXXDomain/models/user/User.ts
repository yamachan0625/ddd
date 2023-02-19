import { Email } from '../shared/Email/Email';
import { UserID } from './UserID/UserID';
import { UserName } from './UserName/UserName';

export class User {
  constructor(
    public readonly userID: UserID,
    public userName: UserName,
    public email: Email
  ) {}

  changeUserName(userName: UserName): void {
    this.userName = userName;
  }

  changeEmail(email: Email): void {
    this.email = email;
  }
}

const user = new User(
  new UserID('aaaaaaa'),
  new UserName('vnjvir'),
  new Email('example@gmial.com')
);

console.log(user.email.value);
