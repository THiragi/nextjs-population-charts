// 参考元: https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html

/**
 * 人口構成データ
 */
export type Population = {
  boudaryYear: number;
  data: Composition[];
};

/**
 * 項目毎の人口推移データ
 */
export type Composition = {
  label: string;
  data: PerYear[];
};

/**
 * 年毎の人口データ
 */
export type PerYear = {
  year: number;
  value: number;
  rate?: number;
};
