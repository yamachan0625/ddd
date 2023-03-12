import { UserName } from '../user/UserName/UserName';
import { ActivityHistoryID } from './ActivityHistoryID/ActivityHistoryID';
import { Detail } from './Detail/Detail';

export class ActivityHistory {
  private constructor(
    public activityHistoryID: ActivityHistoryID,
    public detail: Detail
  ) {}

  static createFromUser(userName: UserName): ActivityHistory {
    const activityHistoryID = ActivityHistoryID.create();

    return new ActivityHistory(
      activityHistoryID,
      Detail.create(`${userName.value}さんが登録されました`)
    );
  }
}
