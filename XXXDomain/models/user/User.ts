import { DomainEventStorable } from '../../shared/DomainEvent';
import { UserCreatedEvent } from '../activityHistory/ActivityHistory';
import { Email } from '../shared/Email/Email';
import { UserID } from './UserID/UserID';
import { UserName } from './UserName/UserName';

export class User extends DomainEventStorable {
  private constructor(
    public userID: UserID,
    public userName: UserName,
    public email: Email
  ) {
    super();
  }

  static create(userName: UserName, email: Email): User {
    const userId = UserID.create();
    console.log({ userId });
    const user = new User(userId, userName, email);
    user.addDomainEvent(new UserCreatedEvent(userName.value));
    return user;
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
