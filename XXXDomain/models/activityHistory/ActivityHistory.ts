import { DomainEvent, DomainEventListener } from '../../shared/DomainEvent';
import { UserName } from '../user/UserName/UserName';
import { Detail } from './Detail/Detail';
import { IActivityHistoryRepository } from './IActivityHistoryRepository';

export class UserCreatedEvent implements DomainEvent {
  name: 'UserCreatedEvent' = 'UserCreatedEvent';

  constructor(public userName: string) {
    this.userName = userName;
  }
}

export class ActivityHistory {
  private constructor(public detail: Detail) {}

  static createFromUser(userName: UserName): ActivityHistory {
    return new ActivityHistory(
      Detail.create(`${userName.value}さんが登録されました`)
    );
  }
}

class ActivityHistoryEventListener {
  constructor(private activityHistoryRepository: IActivityHistoryRepository) {
    // UserCreatedEventが発行された時に呼ばれる
    DomainEventListener.on<UserCreatedEvent>(
      'UserCreatedEvent',
      (event: UserCreatedEvent) => this.createActivityHistory(event)
    );
  }

  async createActivityHistory(event: UserCreatedEvent) {
    const activityHistory = ActivityHistory.createFromUser(
      UserName.create(event.userName)
    );
    await this.activityHistoryRepository.Insert(activityHistory);
  }
}
