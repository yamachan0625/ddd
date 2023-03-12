import { DomainEvent } from '../../shared/DomainEvent';
import { Email } from '../shared/Email/Email';
import { User } from './User';
import { UserID } from './UserID/UserID';
import { UserName } from './UserName/UserName';

// イベントは過去に発生したものであるため、変更されるべきではない
export class UserCreatedEvent implements DomainEvent {
  readonly name: 'UserCreatedEvent' = 'UserCreatedEvent';

  readonly userID: UserID;
  readonly userName: UserName;
  readonly email: Email;

  constructor(private readonly user: User) {
    this.userID = user.userID;
    this.userName = user.userName;
    this.email = user.email;
  }
}
