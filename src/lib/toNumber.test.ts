import toNumber from './toNumber';

describe(toNumber.name, () => {
  it('入力値がstring型の数字の場合、その値をnumber型に変換して返す', () => {
    const code = toNumber('1');
    expect(code).toBe(1);
  });

  it('入力値がstring型の数字の配列の場合、その配列の最初の値をnumber型にして返す', () => {
    const code = toNumber(['1', '2', '3']);
    expect(code).toBe(1);
  });

  it('入力値がnumber型へ変換できないstring型の文字の場合、NaNを返す', () => {
    const code = toNumber('one');
    expect(code).toBe(NaN);
  });

  it('入力値がnumber型へ変換できないstring型の文字の配列の場合、NaNを返す', () => {
    const code = toNumber(['one', 'two', 'three']);
    expect(code).toBe(NaN);
  });
});
