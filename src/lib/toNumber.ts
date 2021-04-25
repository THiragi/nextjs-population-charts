/**
 * クエリから取得した数字(string | string[])をnumberへ変換
 * @param {string | string[]} value
 * @returns {number}
 */
const toNumber = (value: string | string[]): number => {
  // string | string[]を一旦stringへ変換
  const valueString = typeof value === 'string' ? value : value[0];

  return parseInt(valueString, 10);
};

export default toNumber;
