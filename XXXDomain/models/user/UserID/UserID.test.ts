import { UserID } from './UserID';

describe('UserID', () => {
  it('正常系:形式で渡すと、正常にインスタンスが生成される', () => {
    const userID = 'test-user-id';

    expect(UserID.create(userID).value).toBe(userID);
  });

  it('異常系:100文字以上の値を渡すと、例外が発生する', () => {
    const userID = 'a'.repeat(101);

    expect(() => UserID.create(userID)).toThrowError();
  });

  it('異常系:8文字以下の値を渡すと、例外が発生する', () => {
    const userID = 'a'.repeat(7);

    expect(() => UserID.create(userID)).toThrowError();
  });

  it('異常系:許可されていない文字を渡すと、例外が発生する', () => {
    const userID = '[]¥!%&@';

    expect(() => UserID.create(userID)).toThrowError();
  });
});
