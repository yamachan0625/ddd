import { DomainEventListener } from '../../../Infrastructure/event/DomainEventListener';
import { UserCreatedEvent } from '../user/UserCreatedEvent';
import { ActivityHistory } from './ActivityHistory';

export class ActivityHistoryEventListener {
  constructor() {
    // UserCreatedEventが発行された時に呼ばれる
    DomainEventListener.on<UserCreatedEvent>(
      'UserCreatedEvent',
      (event: UserCreatedEvent) => {
        console.log(event);
        this.createActivityHistory(event);
      }
    );
  }

  async createActivityHistory(event: UserCreatedEvent) {
    const activityHistory = ActivityHistory.createFromUser(event.userName);
    // await this.activityHistoryRepository.Insert(activityHistory);
  }
}
