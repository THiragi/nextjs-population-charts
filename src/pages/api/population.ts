import { NextApiRequest, NextApiResponse } from 'next';
import { getPopulationByPrefecture } from '../../lib/fetcher';

// API_KEYを秘匿したいので、Next.jsのAPIルート経由で人口データを取得する
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // `prefCode`が存在しない場合は404エラー
  if (!req.query.prefCode) return res.status(404).end();

  // prefCodeをstring型に整形
  const prefCode =
    typeof req.query.prefCode === 'string'
      ? req.query.prefCode
      : req.query.prefCode[0];

  /**
   * getPopulationByPrefecture()に渡す前に、
   * prefCodeが都道府県コードに含まれているかチェックした方が安全
   */

  const { result } = await getPopulationByPrefecture(prefCode);
  // 取得した人口推移データのうち`label`が`総人口`の物のみを抽出
  const total = result.data.filter(
    (composition) => composition.label === '総人口',
  )[0];

  return res.status(200).json({
    data: total.data,
  });
};
