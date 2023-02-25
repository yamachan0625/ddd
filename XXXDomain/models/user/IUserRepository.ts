import { Email } from '../shared/Email/Email';
import { User } from './User';
import { UserID } from './UserID/UserID';

export interface IUserRepository {
  FindByID(id: UserID): Promise<User | null>;
  FindByEmail(email: Email): Promise<User | null>;
  Insert(user: User): Promise<void>;
  Update(user: User): Promise<void>;
}
