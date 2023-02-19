import { ValueObject } from '../ValueObject';

export class Email extends ValueObject<string> {
  static create(email: string): Email {
    if (email.length > this.MAX_LENGTH || email.length < this.MIN_LENGTH) {
      throw new Error(
        `${this.MIN_LENGTH}文字以上${this.MAX_LENGTH}で指定してください`
      );
    }

    if (!this.REGEX.test(email)) {
      throw new Error('許可されていない文字が含まれています');
    }

    return new Email(email);
  }

  static readonly MAX_LENGTH = 319;
  static readonly MIN_LENGTH = 8;
  static readonly REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]+/;
}
