import { ResasApiResult } from './api';

/**
 * RESAS API `都道府県一覧(api/v1/prefectures)`からのレスポンス
 */
export type PrefectureResponse = ResasApiResult<Prefecture>;

/**
 * 都道府県データ
 */
export type Prefecture = {
  prefCode: number;
  prefName: string;
};
