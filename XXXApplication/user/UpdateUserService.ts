import { IUserRepository } from '../../XXXDomain/models/user/IUserRepository';
import { User } from '../../XXXDomain/models/user/User';
import { CheckDuplicateUserService } from '../../XXXDomain/services/user/CheckDuplicateUserService';
import { UserData } from './UserData';

export class UpdateUserService {
  constructor(
    private userRepository: IUserRepository,
    private checkDuplicateUserService: CheckDuplicateUserService
  ) {}

  async execute(user: User): Promise<UserData> {
    const isDuplicate = await this.checkDuplicateUserService.execute(
      user.email
    );
    if (isDuplicate) {
      throw new Error('ユーザーは既に存在しています');
    }

    // NOTE:122p
    // ドメインオブジェクト(エンティティ)をクライアントに公開しない
    // アプリケーションサービス以外のオブジェクトがドメインオブジェクトのクライアントになるのを防ぐ
    const createdUser: User = await this.userRepository.Insert(user);
    return new UserData(createdUser);
  }
}

class UpdateUserCommand {}
