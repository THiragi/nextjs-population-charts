// RESAS APIエンドポイントからのレスポンス
export type ResasApiResult<T> = {
  message?: string;
  result: T[];
};
