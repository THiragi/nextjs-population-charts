// 参考元:
// https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
// https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html

import { Population } from './population';
import { Prefecture } from './prefecture';
/**
 * RESAS APIエンドポイントからのレスポンス
 */
export type ResasApiResult<T> = {
  message?: string;
  result: T;
};

/**
 * RESAS API `人口構成(api/v1/population/composition/perYear)`からのレスポンス
 */
export type PopulationResponse = ResasApiResult<Population>;

/**
 * RESAS API `都道府県一覧(api/v1/prefectures)`からのレスポンス
 */
export type PrefectureResponse = ResasApiResult<Prefecture[]>;

/**
 * RESAS API `都道府県一覧(api/v1/prefectures)`へのリクエストクエリ
 */
export type GetPopulationQuery = {
  cityCode: '-'; // 今回は市区町村を指定する場合はないので、とりあえず全域指定のみ受け付けないようにする
  prefCode: number;
};
