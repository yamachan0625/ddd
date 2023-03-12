import { ActivityHistory } from '../../XXXDomain/models/activityHistory/ActivityHistory';
import { IActivityHistoryRepository } from '../../XXXDomain/models/activityHistory/IActivityHistoryRepository';

// シングルトンで返す
// インスタンスの使いわ回しをしなければ保存したデータが消えてしまう
export class createInMemoryActivityHistoryRepository {
  private static _instance: InMemoryActivityHistoryRepository;
  private constructor() {}

  public static get instance() {
    // instanceがなければ生成
    if (!this._instance) {
      console.log('new InMemoryActivityHistoryRepository instance');
      this._instance = new InMemoryActivityHistoryRepository();
    }

    // 自身が持つインスタンスを返す
    return this._instance;
  }
}

export default class InMemoryActivityHistoryRepository
  implements IActivityHistoryRepository
{
  constructor() {}

  public DB: {
    [ID in string]: { detail: string };
  } = {};

  async Insert(activityHistory: ActivityHistory) {
    this.DB[activityHistory.activityHistoryID.value] = {
      detail: activityHistory.detail.value,
    };
  }
}
