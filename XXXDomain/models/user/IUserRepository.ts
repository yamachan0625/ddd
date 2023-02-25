import { Email } from '../shared/Email/Email';
import { User } from './User';

export interface IUserRepository {
  Find(email: Email): Promise<User | null>;
  Insert(user: User): Promise<void>;
  Update(user: User): Promise<void>;
}
