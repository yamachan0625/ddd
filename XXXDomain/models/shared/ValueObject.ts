import isEqual from 'lodash/isEqual';

export class ValueObject<T> {
  protected readonly _value: T;

  protected constructor(_value: T) {
    this._value = Object.freeze(_value);
  }

  get value(): T {
    return this._value;
  }

  equals(compareValue: ValueObject<T>): boolean {
    if (compareValue == null) {
      return false;
    }

    // 値オブジェクト同士を比較する
    // NOTE: 中身での比較は行わない 値は"object".valueという使い方をしない
    return isEqual(this._value, compareValue._value);
  }
}
