import { GetUserService } from './GetUserService';
import InMemoryUserRepository from '../../../Infrastructure/Inmemory/InMemoryUserRepository';
import { UserID } from '../../../XXXDomain/models/user/UserID/UserID';
import { User } from '../../../XXXDomain/models/user/User';
import { UserName } from '../../../XXXDomain/models/user/UserName/UserName';
import { Email } from '../../../XXXDomain/models/shared/Email/Email';
import { UserData } from '../UserData';

jest.mock('../../../Infrastructure/Inmemory/InMemoryUserRepository'); // パスを指定
const InMemoryUserRepositoryMock = InMemoryUserRepository as jest.Mock; // TypeScriptでは型変換する必要がある

describe('GetUserService', () => {
  const userID = 'mock-user-test-id';
  const userName = 'テストユーザー';
  const email = 'test@test.com';

  it('正常系:userがrepositoryから取得できる場合、結果がDTOに詰め替えて返される', async () => {
    // given
    // repositoryのreturn値をmockする
    InMemoryUserRepositoryMock.mockImplementation(() => {
      return {
        FindByID: async (userID: UserID) => {
          return new Promise((resolve) =>
            resolve(
              User.recontract(
                UserID.create(userID.value),
                UserName.create(userName),
                Email.create(email)
              )
            )
          );
        },
      };
    });

    const getUserService = new GetUserService(new InMemoryUserRepository());

    const actualDTO = await getUserService.execute(UserID.create(userID));
    const expectDTO = new UserData(
      User.recontract(
        UserID.create(userID),
        UserName.create(userName),
        Email.create(email)
      )
    );
    expect(actualDTO).toEqual(expectDTO);
  });

  it('異常系:userRepositoryから返される値がnullの場合、nullが返される', async () => {
    // given
    // repositoryのreturn値をmockする
    InMemoryUserRepositoryMock.mockImplementation(() => {
      return {
        FindByID: async (userID: UserID) => {
          return new Promise((resolve) => resolve(null));
        },
      };
    });

    const getUserService = new GetUserService(new InMemoryUserRepository());
    const res = await getUserService.execute(UserID.create(userID));

    expect(res).toBeNull();
  });
});
