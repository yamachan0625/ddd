import { User } from './User';

export interface IUserRepository {
  Find(user: User): Promise<User | null>;
  Insert(user: User): Promise<User>;
}
