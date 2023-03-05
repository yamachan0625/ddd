import { Email } from './Email';

describe('Email', () => {
  it('正常系:正しいメールアドレス形式で渡すと、正常にインスタンスが生成される', () => {
    const email = 'test.test@gmail.com';

    expect(Email.create(email).value).toBe(email);
  });

  it('異常系:319文字以上の値を渡すと、例外が発生する', () => {
    const email = 'a'.repeat(320);

    expect(() => Email.create(email)).toThrowError();
  });

  it('異常系:8文字以下の値を渡すと、例外が発生する', () => {
    const email = 'a'.repeat(7);

    expect(() => Email.create(email)).toThrowError();
  });

  it('異常系:許可されていない文字を渡すと、例外が発生する', () => {
    const email = '[]¥!%&@gmail.com';

    expect(() => Email.create(email)).toThrowError();
  });
});
