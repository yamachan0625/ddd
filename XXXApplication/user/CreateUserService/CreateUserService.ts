import { Email } from '../../../XXXDomain/models/shared/Email/Email';
import { IUserRepository } from '../../../XXXDomain/models/user/IUserRepository';
import { User } from '../../../XXXDomain/models/user/User';
import { UserID } from '../../../XXXDomain/models/user/UserID/UserID';
import { UserName } from '../../../XXXDomain/models/user/UserName/UserName';
import { CheckDuplicateUserService } from '../../../XXXDomain/services/user/CheckDuplicateUserService';

export class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private checkDuplicateUserService: CheckDuplicateUserService
  ) {}

  async execute(userName: string, email: string): Promise<void> {
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

    await this.userRepository.Insert(user);
  }
}
