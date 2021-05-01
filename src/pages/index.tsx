import React, { useState } from 'react';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { Chart } from '../components/chart';
import { CheckList } from '../components/checkList';
import { Container } from '../components/container';
import { client } from '../lib/api';
import { ChartData } from '../types/chart';

// getServerSideからreturnされた値から、Pageに渡されるPropsの型を類推
type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const Home: NextPage<PageProps> = ({ result }) => {
  // rechartsへ渡すグラフデータの配列
  const [chartData, setChartData] = useState<ChartData[]>([]);
  // データ取得に失敗した都道府県の配列
  const [failures, setFailures] = useState<number[]>([]);

  const handleCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.currentTarget; // クリックされた要素

    // 一連の処理が終了するまで、チェックボックスを一旦無効化しておく
    selected.disabled = true;

    const [prefCode, prefName] = selected.value.split(':'); // valueから都道府県コードと名前を取得
    const prefCodeNumber = parseInt(prefCode, 10); // 都道府県コードをnumber型に変換

    // クリックしたチェックボックスの状態によって処理を振り分ける
    if (selected.checked) {
      // チェックが入った場合は、APIから人口推移データを取得し、追加する
      await fetch(`/api/population?prefCode=${prefCode}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }

          return res.json();
        })
        .then((json) => {
          // 選択した都道府県が前回データ取得に失敗していた場合、失敗リストから削除
          if (failures.includes(prefCodeNumber)) {
            setFailures(
              failures.filter((failure) => failure !== prefCodeNumber),
            );
          }
          // 取得したデータをrechartsのグラフコンポーネントに渡すデータ配列に追加
          setChartData([
            ...chartData,
            {
              id: prefCodeNumber,
              label: prefName,
              data: json.data,
            },
          ]);
        })
        .catch(() => {
          // データ取得に失敗した場合、都道府県を失敗リストへ追加
          setFailures([...failures, prefCodeNumber]);
        });
    } else {
      // チェックが外れた場合、その都道府県の人口推移データを削除する
      setChartData(chartData.filter((pref) => pref.label !== prefName));
    }
    // チェックボックスを有効化
    selected.disabled = false;
  };

  return (
    <Container
      title="都道府県別人口推移グラフ"
      description="チェックを入れた都道府県の人口推移がグラフで表示されます"
    >
      <section>
        <h2>都道府県一覧</h2>
        <CheckList
          result={result}
          failures={failures}
          handleCheck={handleCheck}
        />
        <Chart chartData={chartData} />
      </section>
    </Container>
  );
};

// リクエスト時に都道府県一覧データを取得
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = async () => {
  const { result } = await client.v1.prefectures.$get();

  return {
    props: {
      result,
    },
  };
};

export default Home;
