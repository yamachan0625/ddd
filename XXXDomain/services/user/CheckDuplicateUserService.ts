import { Email } from '../../models/shared/Email/Email';
import { IUserRepository } from '../../models/user/IUserRepository';

export class CheckDuplicateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: Email) {
    const found = await this.userRepository.Find(email);
    return found !== null;
  }
}
