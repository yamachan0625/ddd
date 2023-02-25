import { Email } from '../../XXXDomain/models/shared/Email/Email';
import { IUserRepository } from '../../XXXDomain/models/user/IUserRepository';
import { UserID } from '../../XXXDomain/models/user/UserID/UserID';
import { UserName } from '../../XXXDomain/models/user/UserName/UserName';
import { CheckDuplicateUserService } from '../../XXXDomain/services/user/CheckDuplicateUserService';
import { UpdateUserCommand } from './UpdateUserCommand';

export class UpdateUserService {
  constructor(
    private userRepository: IUserRepository,
    private checkDuplicateUserService: CheckDuplicateUserService
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const targetId = UserID.create(command.userId);
    const user = await this.userRepository.FindByID(targetId);

    if (user === null) {
      throw new Error('対象のユーザーが既存在しません');
    }

    if (command.email) {
      user.changeEmail(Email.create(command.email));
      const isDuplicate = await this.checkDuplicateUserService.execute(
        user.email
      );
      if (isDuplicate) {
        throw new Error('ユーザーは既に存在しています');
      }
    }

    if (command.userName) {
      user.changeUserName(UserName.create(command.userName));
    }

    await this.userRepository.Update(user);
  }
}
