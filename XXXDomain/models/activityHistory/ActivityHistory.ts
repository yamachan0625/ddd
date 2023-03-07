import { DomainEvent, DomainEventListener } from '../../shared/DomainEvent';
import { UserName } from '../user/UserName/UserName';
import { Detail } from './Detail/Detail';
import { IActivityHistoryRepository } from './IActivityHistoryRepository';

export class UserCreateEvent implements DomainEvent {
  name: 'UserCreateEvent' = 'UserCreateEvent';

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
    // UserCreateEventが発行された時に呼ばれる
    DomainEventListener.on<UserCreateEvent>(
      'UserCreateEvent',
      (event: UserCreateEvent) => this.createActivityHistory(event)
    );
  }

  async createActivityHistory(event: UserCreateEvent) {
    const activityHistory = ActivityHistory.createFromUser(
      UserName.create(event.userName)
    );
    await this.activityHistoryRepository.Insert(activityHistory);
  }
}
