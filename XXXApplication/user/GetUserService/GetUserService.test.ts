import { GetUserService } from './GetUserService';
import InMemoryUserRepository from '../../../Infrastructure/Inmemory/InMemoryUserRepository';
import { UserID } from '../../../XXXDomain/models/user/UserID/UserID';
import { UserData } from '../UserData';
import { TestUserFactory } from './TestUserFactory';

jest.mock('../../../Infrastructure/Inmemory/InMemoryUserRepository'); // パスを指定
const InMemoryUserRepositoryMock = InMemoryUserRepository as jest.Mock; // TypeScriptでは型変換する必要がある

describe('GetUserService', () => {
  const userID = 'mock-user-test-id';

  it('正常系:userがrepositoryから取得できる場合、結果がDTOに詰め替えて返される', async () => {
    // given
    // repositoryのreturn値をmockする
    InMemoryUserRepositoryMock.mockImplementation(() => {
      return {
        FindByID: async (userID: UserID) => {
          return new Promise((resolve) =>
            resolve(TestUserFactory(UserID.create(userID.value)))
          );
        },
      };
    });

    const getUserService = new GetUserService(new InMemoryUserRepository());

    const actualDTO = await getUserService.execute(UserID.create(userID));
    const expectDTO = new UserData(TestUserFactory(UserID.create(userID)));
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
