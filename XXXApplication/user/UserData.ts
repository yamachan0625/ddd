import { User } from '../../XXXDomain/models/user/User';

// DTO
export class UserData {
  readonly userId: string;
  readonly userName: string;
  readonly email: string;

  constructor(public user: User) {
    this.userId = user.userID.value;
    this.userName = user.userName.value;
    this.email = user.email.value;
  }
}
