import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../lib/api';
import toNumber from '../../lib/toNumber';

// API_KEYを秘匿したいので、Next.jsのAPIルート経由で人口データを取得する
export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // `prefCode`が存在しない場合は404エラー
  if (!req.query.prefCode) return res.status(404).end();

  // `prefCode`をnumber型へ変換
  const prefCode = toNumber(req.query.prefCode);

  // 変換した`prefCode`が整数ではない場合は404エラー
  if (!Number.isInteger(prefCode)) return res.status(404).end();
  // `prefCode`の値が都道府県コードに含まれない数字の場合は404エラー
  if (prefCode === 0 || prefCode > 47) return res.status(404).end();

  // `prefCode`を使ってRESAS APIから都道府県別人口推移データを取得
  const { result } = await client.v1.population.composition.perYear.$get({
    query: {
      cityCode: '-',
      prefCode,
    },
  });

  // 取得した人口推移データのうち`label`が`総人口`の物のみを抽出
  const total = result.data.filter(
    (composition) => composition.label === '総人口',
  )[0];

  return res.status(200).json({
    data: total.data,
  });
};
