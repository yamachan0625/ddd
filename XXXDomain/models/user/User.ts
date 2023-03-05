import { Email } from '../shared/Email/Email';
import { UserID } from './UserID/UserID';
import { UserName } from './UserName/UserName';

export class User {
  private constructor(
    public userID: UserID,
    public userName: UserName,
    public email: Email
  ) {}

  static create(userName: UserName, email: Email): User {
    return new User(UserID.create(), userName, email);
  }

  static recontract(userID: UserID, userName: UserName, email: Email) {
    return new User(userID, userName, email);
  }

  changeUserName(userName: UserName): void {
    this.userName = userName;
  }

  changeEmail(email: Email): void {
    this.email = email;
  }
}
