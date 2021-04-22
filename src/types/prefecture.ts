import { ResasApiResult } from './api';

// `api/v1/prefectures`から取得されるデータ構造

export type PrefectureResponse = ResasApiResult<Prefecture>;

// 都道府県データ
export type Prefecture = {
  prefCode: number;
  prefName: string;
};
