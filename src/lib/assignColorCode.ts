/**
 * 与えられた引数を元に16進数のカラーコードを生成する
 * @param {number} value 任意の数値
 * @param {number} range 生成する配色数
 * @param {number} max rgbの最高値
 * @param {number} min rgbの最低値
 * @returns
 */
const assignColorCode = (max: number) => (min: number) => (range: number) => (
  value: number,
): string => {
  /**
   * rangeより大きい数値がvalueに渡されても、
   * rangeの数以上の色が生成されないよう調整している。
   * rangeが16、valueが17の場合、valueは1に変換される
   */
  const remain = Math.floor(value / range);
  const amount = value - range * remain;

  /**
   * 色の基準値は3つの値を3元色が持ち回るので、
   * 3の倍数毎に変化量を増やしていくようにする
   */
  const diff = max - min; // 最高値と最初値の差分
  const changed = Math.ceil(amount / 3);
  const assigned = Math.ceil(diff / range) * 3; // 変化の基準値
  const middle = assigned * changed + min;

  // rgbの3つの数値をそれぞれ16進数へ変換
  const high = `0${max.toString(16)}`.slice(-2);
  const low = `0${min.toString(16)}`.slice(-2);
  const mid = `0${middle.toString(16)}`.slice(-2);

  // 1, 2, 3…と連番を渡すと、赤、青、緑の基調の色を返す
  if (amount % 3 === 1) {
    return `#${high}${mid}${low}`;
  }
  if (amount % 3 === 2) {
    return `#${mid}${low}${high}`;
  }

  return `#${low}${high}${mid}`;
};

export default assignColorCode;
