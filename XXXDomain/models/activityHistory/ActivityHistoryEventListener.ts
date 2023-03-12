import { DomainEventListener } from '../../../Infrastructure/event/DomainEventListener';
import { UserCreatedEvent } from '../user/UserCreatedEvent';
import { ActivityHistory } from './ActivityHistory';
import { IActivityHistoryRepository } from './IActivityHistoryRepository';

export class ActivityHistoryEventListener {
  constructor(private activityHistoryRepository: IActivityHistoryRepository) {
    // UserCreatedEventが発行された時に呼ばれる
    DomainEventListener.on<UserCreatedEvent>(
      'UserCreatedEvent',
      (event: UserCreatedEvent) => {
        this.createActivityHistory(event);
      }
    );
  }

  async createActivityHistory(event: UserCreatedEvent) {
    const activityHistory = ActivityHistory.createFromUser(event.userName);
    await this.activityHistoryRepository.Insert(activityHistory);
  }
}
