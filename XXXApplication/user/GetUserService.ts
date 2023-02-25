import { IUserRepository } from '../../XXXDomain/models/user/IUserRepository';
import { UserID } from '../../XXXDomain/models/user/UserID/UserID';
import { UserData } from './UserData';

export class GetUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: UserID): Promise<UserData | null> {
    const user = await this.userRepository.FindByID(id);

    if (user === null) return null;

    // NOTE:122p
    // ドメインオブジェクト(エンティティ)をクライアントに公開しない
    // アプリケーションサービス以外のオブジェクトがドメインオブジェクトのクライアントになるのを防ぐ
    return new UserData(user);
  }
}
