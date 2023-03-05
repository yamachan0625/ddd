import { UserName } from './UserName';

describe('UserName', () => {
  it('正常系:形式で渡すと、正常にインスタンスが生成される', () => {
    const userName = 'テストユーザーネーム';

    expect(UserName.create(userName).value).toBe(userName);
  });

  it('異常系:100文字以上の値を渡すと、例外が発生する', () => {
    const userName = 'a'.repeat(101);

    expect(() => UserName.create(userName)).toThrowError();
  });

  it('異常系:1文字以下の値を渡すと、例外が発生する', () => {
    const userName = '';

    expect(() => UserName.create(userName)).toThrowError();
  });

  it('異常系:許可されていない文字を渡すと、例外が発生する', () => {
    const userName = '[]¥!%&@';

    expect(() => UserName.create(userName)).toThrowError();
  });
});
