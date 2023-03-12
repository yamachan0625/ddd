import { UserName } from '../user/UserName/UserName';
import { Detail } from './Detail/Detail';

export class ActivityHistory {
  private constructor(public detail: Detail) {}

  static createFromUser(userName: UserName): ActivityHistory {
    return new ActivityHistory(
      Detail.create(`${userName.value}さんが登録されました`)
    );
  }
}
