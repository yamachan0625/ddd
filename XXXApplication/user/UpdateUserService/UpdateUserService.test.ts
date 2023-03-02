import { createInMemoryUserRepository } from '../../../Infrastructure/Inmemory/InMemoryUserRepository';
import { Email } from '../../../XXXDomain/models/shared/Email/Email';
import { UserID } from '../../../XXXDomain/models/user/UserID/UserID';
import { UserName } from '../../../XXXDomain/models/user/UserName/UserName';
import { CheckDuplicateUserService } from '../../../XXXDomain/services/user/CheckDuplicateUserService';
import { CreateUserService } from '../CreateUserService/CreateUserService';
import { CreateUserCommand } from '../CreateUserService/CreateUserServiceCommand';
import { UpdateUserCommand } from './UpdateUserCommand';
import { UpdateUserService } from './UpdateUserService';

describe('UpdateUserService', () => {
  let userId = '';
  const userName = 'テストユーザー';
  const email = 'test@test.com';

  const userRepository = createInMemoryUserRepository.instance;
  const checkDuplicateUserService = new CheckDuplicateUserService(
    userRepository
  );

  const createUserService = new CreateUserService(
    userRepository,
    checkDuplicateUserService
  );

  const updateUserService = new UpdateUserService(
    userRepository,
    checkDuplicateUserService
  );

  beforeAll(async () => {
    await createUserService.execute(new CreateUserCommand(userName, email));
    const user = await userRepository.FindByEmail(Email.create(email));
    userId = user?.userID.value as string;
  });

  it('正常系:更新されるデータが同一でもユーザーが正常に更新できる', async () => {
    // when
    await updateUserService.execute(
      new UpdateUserCommand(userId, userName, email)
    );

    // then
    const updatedUser = await userRepository.FindByID(UserID.create(userId));
    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.email.equals(Email.create(email))).toBeTruthy();
    expect(
      updatedUser?.userName.equals(UserName.create(userName))
    ).toBeTruthy();
  });

  it('正常系:ユーザーが正常に更新できる', async () => {
    // when
    const updateUserName = 'テストユーザーdayo';
    const updateEmail = 'testdayo@test.com';

    await updateUserService.execute(
      new UpdateUserCommand(userId, updateUserName, updateEmail)
    );

    // then
    const updatedUser = await userRepository.FindByID(UserID.create(userId));
    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.email.equals(Email.create(updateEmail))).toBeTruthy();
    expect(
      updatedUser?.userName.equals(UserName.create(updateUserName))
    ).toBeTruthy();
  });

  it('異常系:メールアドレスが同一のユーザーが既に存在していた場合例外', async () => {
    // 重複させるデータの生成
    const testEmail = 'test2@test.com';
    await createUserService.execute(new CreateUserCommand(userName, testEmail));

    // then
    await expect(
      updateUserService.execute(
        new UpdateUserCommand(userId, userName, testEmail)
      )
    ).rejects.toThrow();
  });
});
