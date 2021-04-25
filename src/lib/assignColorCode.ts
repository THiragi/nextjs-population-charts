/**
 * 数値を与えるとカラーコードを生成して返す。
 * @param {number} value 任意の数値
 * @param {number} range 色の変化量
 * @param {number} max rgbの最高地
 * @param {number} min rgbの最低値
 * @returns
 */
const assignColorCode = (
  value: number,
  range: number,
  max: number,
  min: number,
): string => {
  const diff = max - min;
  const amount = Math.ceil(diff / range) * value + min;

  // rgbの3つの数値をそれぞれ16進数へ変換
  const high = `0${max.toString(16)}`.slice(-2);
  const low = `0${min.toString(16)}`.slice(-2);
  const mid = `0${amount.toString(16)}`.slice(-2);

  // 1, 2, 3…と連番を渡すと、赤、青、緑の基調の色を返す
  if (value % 3 === 1) {
    return `#${high}${mid}${low}`;
  }
  if (value % 3 === 2) {
    return `#${mid}${low}${high}`;
  }

  return `#${low}${high}${mid}`;
};

export default assignColorCode;
