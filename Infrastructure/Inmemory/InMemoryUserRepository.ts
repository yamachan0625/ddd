import { Email } from '../../XXXDomain/models/shared/Email/Email';
import { IUserRepository } from '../../XXXDomain/models/user/IUserRepository';
import { User } from '../../XXXDomain/models/user/User';
import { UserID } from '../../XXXDomain/models/user/UserID/UserID';
import { UserName } from '../../XXXDomain/models/user/UserName/UserName';

// シングルトンで返す
// インスタンスの使いわ回しをしなければ保存したデータが消えてしまう
export class createInMemoryUserRepository {
  private static _instance: InMemoryUserRepository;
  private constructor() {}

  public static get instance() {
    // instanceがなければ生成
    if (!this._instance) {
      this._instance = new InMemoryUserRepository();
    }

    // 自身が持つインスタンスを返す
    return this._instance;
  }
}

export default class InMemoryUserRepository implements IUserRepository {
  constructor() {}

  public DB: {
    [ID in string]: { email: string; userName: string };
  } = {};

  async FindByID(userId: UserID): Promise<User | null> {
    const user = Object.entries(this.DB).find(([key]) => {
      return userId.value === key;
    });

    if (!user) return null;

    const id = user[0];
    const val = user[1];
    return User.recontract(
      UserID.create(id),
      UserName.create(val.userName),
      Email.create(val.email)
    );
  }

  async FindByEmail(email: Email): Promise<User | null> {
    const user = Object.entries(this.DB).find(([, value]) => {
      return email.value === value.email;
    });

    if (!user) return null;

    const id = user[0];
    const val = user[1];
    return User.recontract(
      UserID.create(id),
      UserName.create(val.userName),
      Email.create(val.email)
    );
  }

  async Insert(user: User) {
    this.DB[user.userID.value] = {
      email: user.email.value,
      userName: user.userName.value,
    };
  }

  async Update(user: User) {
    this.DB[user.userID.value] = {
      email: user.email.value,
      userName: user.userName.value,
    };
  }
}
