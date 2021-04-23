import { PopulationResponse } from '../types/population';
import { PrefectureResponse } from '../types/prefecture';

// リクエストヘッダー
const requestHeaders = {
  headers: {
    'X-API-KEY': `${process.env.RESAS_API_KEY}`,
  },
};

/**
 * RESAS APIより都道府県一覧データを取得します。
 *
 * @returns {Promise<PrefectureResponse>}
 */
export const getAllPrefectures = async (): Promise<PrefectureResponse> => {
  const result: PrefectureResponse = await fetch(
    `${process.env.RESAS_API_ENDPOINT}prefectures/`,
    requestHeaders,
  ).then((res) => res.json());

  return result;
};

/**
 * RESAS APIより引数に渡された都道府県毎の人口構成データを取得します。
 *
 * @param {string} prefCode 都道府県コード
 * @returns {Promise<PopulationResponse>}
 */
export const getPopulationByPrefecture = async (
  prefCode: string,
): Promise<PopulationResponse> => {
  const result: Promise<PopulationResponse> = await fetch(
    `${process.env.RESAS_API_ENDPOINT}population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    requestHeaders,
  ).then((res) => res.json());

  return result;
};
