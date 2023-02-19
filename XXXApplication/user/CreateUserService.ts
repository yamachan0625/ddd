import { IUserRepository } from '../../XXXDomain/models/user/IUserRepository';
import { User } from '../../XXXDomain/models/user/User';
import { UserData } from './UserData';

export class CreateUserService {
  constructor(public userRepository: IUserRepository) {}

  async execute(user: User): Promise<UserData> {
    // NOTE:122p
    // ドメインオブジェクト(エンティティ)をクライアントに公開しない
    // アプリケーションサービス以外のオブジェクトがドメインオブジェクトのクライアントになるのを防ぐ
    const createdUser: User = await this.userRepository.Insert(user);

    return new UserData(createdUser);
  }
}
