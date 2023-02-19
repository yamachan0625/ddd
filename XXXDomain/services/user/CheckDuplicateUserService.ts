import { IUserRepository } from '../../models/user/IUserRepository';
import { User } from '../../models/user/User';

export class CheckDuplicateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(user: User) {
    const found = await this.userRepository.Find(user);
    return found !== null;
  }
}
