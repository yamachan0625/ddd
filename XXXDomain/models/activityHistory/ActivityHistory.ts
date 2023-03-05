import { User } from '../user/User';
import { Detail } from './Detail/Detail';

export class ActivityHistory {
  private constructor(public detail: Detail) {}

  static createFromUser(user: User): ActivityHistory {
    return new ActivityHistory(
      Detail.create(`${user.userName.value}さんが登録されました`)
    );
  }
}
