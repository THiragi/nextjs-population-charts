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

import { getAllPrefectures } from '../lib/fetcher';

import { Composition } from '../types/population';

// getServerSideからreturnされた値から、Pageに渡されるPropsの型を類推
type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<PageProps> = ({ result }) => {
  const [chartData, setChartData] = useState<Composition[]>([]);

  const handleCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.currentTarget;
    const [prefCode, prefName] = selected.value.split(':');

    // クリックしたチェックボックスの状態によって処理を振り分ける
    if (selected.checked) {
      // チェックが入った場合は、APIから人口推移データを取得し、追加する
      await fetch(`/api/population?prefCode=${prefCode}`)
        .then((res) => res.json())
        .then((json) => {
          const increasedData = chartData.concat([
            {
              label: prefName,
              data: json.data,
            },
          ]);
          // fetchがエラーだった場合の処理も必要。

          setChartData(increasedData);
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
  const { result } = await getAllPrefectures();

  return {
    props: {
      result,
    },
  };
};

export default Home;
