import { UniqueID } from '../../shared/UniqueID/UniqueID';

export class UserID extends UniqueID {
  static create(userID?: string): UserID {
    return super.create(userID);
  }
}
