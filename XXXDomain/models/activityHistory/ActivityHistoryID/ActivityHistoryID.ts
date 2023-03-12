import { UniqueID } from '../../shared/UniqueID/UniqueID';

export class ActivityHistoryID extends UniqueID {
  static create(activityHistoryID?: string): ActivityHistoryID {
    return super.create(activityHistoryID);
  }
}
