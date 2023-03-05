import { ValueObject } from '../../shared/ValueObject';

export class Detail extends ValueObject<string> {
  static create(detail: string): Detail {
    if (detail.length > this.MAX_LENGTH || detail.length < this.MIN_LENGTH) {
      throw new Error(
        `${this.MAX_LENGTH}文字以上${this.MIN_LENGTH}文字以下で指定してください`
      );
    }

    if (!this.REGEX.test(detail)) {
      throw new Error('許可されていない文字が含まれています');
    }

    return new Detail(detail);
  }

  static readonly MAX_LENGTH = 1000;
  static readonly MIN_LENGTH = 1;
  static readonly REGEX = /^[a-zA-Zぁ-んァ-ンヴｧ-ﾝﾞﾟー\u4E00-\u9FFF]+$/;
}
