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
  // RESAS APIから取得した人口データを貯蔵
  const [storeData, setStoreData] = useState<ChartData[]>([]);
  // チェックが入っているチェックボックス
  const [checkCode, setCheckCode] = useState<number[]>([]);
  // データ取得に失敗した都道府県の配列
  const [failures, setFailures] = useState<number[]>([]);
  // rechartsへ渡すグラフデータの配列
  const chartData = storeData.filter((data) => checkCode.includes(data.id));

  // チェックボックスの状態のみを管理する
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.currentTarget;
    const value = parseInt(selected.value, 10);
    if (selected.checked) {
      setCheckCode([...checkCode, value]);
    } else {
      setCheckCode(checkCode.filter((code) => code !== value));
    }
  };

  // クリックした都道府県の人口データが取得されていない場合は取得する
  const handleClick = async (code: number, name: string) => {
    const isChartData =
      storeData.filter((data) => data.id === code).length !== 0;

    if (!isChartData) {
      await fetch(`/api/population?prefCode=${code}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }

          return res.json();
        })
        .then((json) => {
          // 選択した都道府県が前回データ取得に失敗していた場合、失敗リストから削除
          if (failures.includes(code)) {
            setFailures(failures.filter((failure) => failure !== code));
          }
          // 取得したデータをrechartsのグラフコンポーネントに渡すデータ配列に追加
          setStoreData([
            ...storeData,
            {
              id: code,
              label: name,
              data: json.data,
            },
          ]);
        })
        .catch(() => {
          // データ取得に失敗した場合、都道府県を失敗リストへ追加
          setFailures([...failures, code]);
        });
    }
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
          handleChange={handleChange}
          handleClick={(code: number, name: string) => handleClick(code, name)}
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
