import { ActivityHistory } from './ActivityHistory';

export interface IActivityHistoryRepository {
  Insert(activityHistory: ActivityHistory): Promise<void>;
}
