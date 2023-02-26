import { ValueObject } from '../ValueObject';

export class Email extends ValueObject<string> {
  static create(email: string): Email {
    if (email.length > this.MAX_LENGTH || email.length < this.MIN_LENGTH) {
      throw new Error(
        `${this.MAX_LENGTH}文字以上${this.MIN_LENGTH}文字以下で指定してください`
      );
    }

    if (!this.REGEX.test(email)) {
      throw new Error('許可されていない文字が含まれています');
    }

    return new Email(email);
  }

  static readonly MAX_LENGTH = 319;
  static readonly MIN_LENGTH = 8;
  static readonly REGEX =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
}
