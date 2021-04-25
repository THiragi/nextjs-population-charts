import React, { useState } from 'react';

import { InferGetServerSidePropsType, NextPage } from 'next';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import client from '../lib/api';
import assignColorCode from '../lib/assignColorCode';
import { ChartData } from '../types/chart';

// 都道府県グラフの配色の配列
const colorCode = [...Array(48)].map((_, i) => assignColorCode(i, 48, 210, 50));

// getServerSideからreturnされた値から、Pageに渡されるPropsの型を類推
type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<PageProps> = ({ result }) => {
  // rechartsへ渡すチャードデータの配列
  const [chartData, setChartData] = useState<ChartData[]>([]);
  // データ取得に失敗した都道府県の配列
  const [failures, setFailures] = useState<string[]>([]);

  const handleCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.currentTarget;
    const [prefCode, prefName] = selected.value.split(':');

    // クリックしたチェックボックスの状態によって処理を振り分ける
    if (selected.checked) {
      // 選択した都道府県が前回データ取得に失敗していた場合、一旦失敗リストから削除
      if (failures.includes(prefName)) {
        setFailures(failures.filter((failure) => failure !== prefName));
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
          const increasedData = chartData.concat([
            {
              id: parseInt(prefCode, 10),
              label: prefName,
              data: json.data,
            },
          ]);
          setChartData(increasedData);
        })
        .catch(() => {
          // データ取得に失敗した場合、都道府県を失敗リストへ追加
          setFailures([...failures, prefName]);
        });
    } else {
      // チェックが外れた場合、その都道府県の人口推移データを削除する
      const reducedData = chartData.filter(
        (composition) => composition.label !== prefName,
      );
      setChartData(reducedData);
    }
  };

  return (
    <div>
      <h1>都道府県一覧</h1>
      {failures.length !== 0 && (
        <div>
          <h3>以下の都道府県のデータの取得に失敗しています</h3>
          <ul>
            {failures.map((failure) => (
              <li key={failure}>{failure}</li>
            ))}
          </ul>
        </div>
      )}
      <ul style={{ display: 'flex', width: '700px', listStyle: 'none' }}>
        {result.map((data) => (
          <li key={data.prefCode}>
            <label htmlFor={`pref-${data.prefCode}`}>
              <input
                id={`pref-${data.prefCode}`}
                type="checkbox"
                value={`${data.prefCode}:${data.prefName}`}
                onChange={handleCheck}
              />
              {data.prefName}
            </label>
          </li>
        ))}
      </ul>
      <div style={{ width: '700px', height: '400px', margin: '0 auto' }}>
        <ResponsiveContainer width="80%">
          <LineChart>
            <XAxis
              dataKey="year"
              type="category"
              allowDuplicatedCategory={false}
            />
            <YAxis dataKey="value" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            {chartData.length &&
              chartData.map((c) => (
                <Line
                  dataKey="value"
                  data={c.data}
                  name={c.label}
                  key={c.label}
                  stroke={colorCode[c.id]}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
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
