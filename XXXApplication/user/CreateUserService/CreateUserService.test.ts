import { createInMemoryUserRepository } from '../../../Infrastructure/Inmemory/InMemoryUserRepository';
import { Email } from '../../../XXXDomain/models/shared/Email/Email';
import { CheckDuplicateUserService } from '../../../XXXDomain/services/user/CheckDuplicateUserService';
import { CreateUserService } from './CreateUserService';

describe('CreateUserService', () => {
  it('ユーザーが正常に作成できる', async () => {
    // given
    const userRepository = createInMemoryUserRepository.instance;
    const checkDuplicateUserService = new CheckDuplicateUserService(
      userRepository
    );
    const createUserService = new CreateUserService(
      userRepository,
      checkDuplicateUserService
    );

    // when
    const userName = 'テストユーザー';
    const email = 'test@test.com';
    await createUserService.execute(userName, email);

    // then
    const createdUserEmail = Email.create(email);
    const createdUser = await userRepository.FindByEmail(createdUserEmail);

    expect(createdUser).not.toBeNull();
  });

  it('メールアドレスが同一のユーザーが既に存在していた場合異常', async () => {
    // given
    const userRepository = createInMemoryUserRepository.instance;

    const checkDuplicateUserService = new CheckDuplicateUserService(
      userRepository
    );
    const createUserService = new CreateUserService(
      userRepository,
      checkDuplicateUserService
    );

    // when
    const userName = 'テストユーザーX';
    const email = 'test@test.com'; // 同じアドレス

    // then
    await expect(createUserService.execute(userName, email)).rejects.toThrow();
  });

  it('異常な値が渡される場合異常発生', async () => {
    // given
    const userRepository = createInMemoryUserRepository.instance;
    const checkDuplicateUserService = new CheckDuplicateUserService(
      userRepository
    );
    const createUserService = new CreateUserService(
      userRepository,
      checkDuplicateUserService
    );

    // when
    const userName = 'テストユーザー';
    const email = 'brebebfdberbre'; // 無効なメールアドレス形式

    // then
    await expect(createUserService.execute(userName, email)).rejects.toThrow();
  });
});
