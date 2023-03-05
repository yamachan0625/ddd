import { Email } from '../../../XXXDomain/models/shared/Email/Email';
import { User } from '../../../XXXDomain/models/user/User';
import { UserID } from '../../../XXXDomain/models/user/UserID/UserID';
import { UserName } from '../../../XXXDomain/models/user/UserName/UserName';

export const TestUserFactory = (
  userID: UserID = UserID.create(),
  userName: string = 'テストユーザー',
  email: string = 'test@test.com'
): User => {
  return User.recontract(
    userID,
    UserName.create(userName),
    Email.create(email)
  );
};
