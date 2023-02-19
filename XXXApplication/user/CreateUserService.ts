import { Email } from '../../XXXDomain/models/shared/Email/Email';
import { IUserRepository } from '../../XXXDomain/models/user/IUserRepository';
import { User } from '../../XXXDomain/models/user/User';
import { UserID } from '../../XXXDomain/models/user/UserID/UserID';
import { UserName } from '../../XXXDomain/models/user/UserName/UserName';
import { CheckDuplicateUserService } from '../../XXXDomain/services/user/CheckDuplicateUserService';
import { UserData } from './UserData';

export class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private checkDuplicateUserService: CheckDuplicateUserService
  ) {}

  async execute(userName: string, email: string): Promise<UserData> {
    const user = User.create(
      UserID.create(), // 初期採番
      UserName.create(userName),
      Email.create(email)
    );

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
