import { ValueObject } from '../../shared/ValueObject';

export class UserName extends ValueObject<string> {
  static create(userName: string): UserName {
    if (
      userName.length > this.MAX_LENGTH ||
      userName.length < this.MIN_LENGTH
    ) {
      throw new Error(
        `${this.MIN_LENGTH}文字以上${this.MAX_LENGTH}で指定してください`
      );
    }

    if (!this.REGEX.test(userName)) {
      throw new Error('許可されていない文字が含まれています');
    }

    return new UserName(userName);
  }

  static readonly MAX_LENGTH = 100;
  static readonly MIN_LENGTH = 1;
  static readonly REGEX = /^[a-zA-Zぁ-んァ-ンヴｧ-ﾝﾞﾟ\u4E00-\u9FFF]+$/;
}
