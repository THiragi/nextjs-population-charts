import React, { useState } from 'react';

import { InferGetServerSidePropsType, NextPage } from 'next';

import Chart from '../components/chart';
import CheckList from '../components/checkList';
import Container from '../components/container';
import FailureAlert from '../components/failureAlert';

import client from '../lib/api';
import { ChartData } from '../types/chart';
import { Prefecture } from '../types/prefecture';

// getServerSideからreturnされた値から、Pageに渡されるPropsの型を類推
type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<PageProps> = ({ result }) => {
  // rechartsへ渡すチャードデータの配列
  const [chartData, setChartData] = useState<ChartData[]>([]);
  // データ取得に失敗した都道府県の配列
  const [failures, setFailures] = useState<Prefecture[]>([]);

  const handleCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.currentTarget;
    const [prefCode, prefName] = selected.value.split(':');

    const prefCodeNumber = parseInt(prefCode, 10);

    // クリックしたチェックボックスの状態によって処理を振り分ける
    if (selected.checked) {
      // 選択した都道府県が前回データ取得に失敗していた場合、一旦失敗リストから削除
      if (failures.find((failure) => failure.prefName === prefName)) {
        setFailures(
          failures.filter((failure) => failure.prefName !== prefName),
        );
      }
      // チェックが入った場合は、APIから人口推移データを取得し、追加する
      await fetch(`/api/population?prefCode=${prefCode}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }

          return res.json();
        })
        .then((json) => {
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
          setFailures([...failures, { prefCode: prefCodeNumber, prefName }]);
        });
    } else {
      // チェックが外れた場合、その都道府県の人口推移データを削除する
      setChartData(chartData.filter((pref) => pref.label !== prefName));
    }
  };

  return (
    <Container
      title="都道府県別人口推移チャート"
      description="チェックを入れた都道府県の人口推移がチャートで表示されます"
    >
      <section>
        <h1>都道府県一覧</h1>
        {failures.length !== 0 && <FailureAlert failures={failures} />}
        <CheckList result={result} handleCheck={handleCheck} />
        <Chart chartData={chartData} />
      </section>
    </Container>
  );
};

// リクエスト時に都道府県一覧データを取得
export const getServerSideProps = async () => {
  const { result } = await client.v1.prefectures.$get();

  return {
    props: {
      result,
    },
  };
};

export default Home;
