import { Email } from '../../../XXXDomain/models/shared/Email/Email';
import { IUserRepository } from '../../../XXXDomain/models/user/IUserRepository';
import { User } from '../../../XXXDomain/models/user/User';
import { UserName } from '../../../XXXDomain/models/user/UserName/UserName';
import { CheckDuplicateUserService } from '../../../XXXDomain/services/user/CheckDuplicateUserService';
import { DomainEventPublisher } from '../../../XXXDomain/shared/DomainEvent';
import { CreateUserCommand } from './CreateUserServiceCommand';

export class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private checkDuplicateUserService: CheckDuplicateUserService,
    private domainEventPublisher: DomainEventPublisher
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const user = User.create(
      UserName.create(command.userName),
      Email.create(command.email)
    );

    const isDuplicate = await this.checkDuplicateUserService.execute(
      user.email
    );
    if (isDuplicate) {
      throw new Error('ユーザーは既に存在しています');
    }

    await this.userRepository.Insert(user, this.domainEventPublisher); // insert成功時にUserCreatedEventが発行される
  }
}
