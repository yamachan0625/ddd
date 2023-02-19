import { ValueObject } from '../ValueObject';
import { nanoid } from 'nanoid';

export class UniqueID extends ValueObject<string> {
  static create(uniqueID: string = nanoid()): UniqueID {
    if (this.MAX_LENGTH > 100 || this.MIN_LENGTH < 8) {
      throw new Error(
        `${this.MIN_LENGTH}文字以上${this.MAX_LENGTH}で指定してください`
      );
    }

    if (!this.REGEX.test(uniqueID)) {
      throw new Error('許可されていない文字が含まれています');
    }

    return UniqueID.create(uniqueID);
  }

  static readonly MAX_LENGTH = 100;
  static readonly MIN_LENGTH = 8;
  static readonly REGEX = /^[a-zA-Z\d_-]+$/;
}
