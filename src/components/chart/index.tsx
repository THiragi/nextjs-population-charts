import React from 'react';
import {
  LineChart,
  Line,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import assignColorCode from '../../lib/assignColorCode';

import { ChartData } from '../../types/chart';

import styles from './index.module.scss';

// 都道府県グラフの配色の配列
const assignColorCodeByValue = assignColorCode(210)(50)(16);
const colorCode = [...Array(48)].map((_, i) => assignColorCodeByValue(i));

type Props = {
  chartData: ChartData[];
};

const Chart: React.VFC<Props> = ({ chartData }) => (
  <div className={styles.outer}>
    <div className={styles.chart}>
      <ResponsiveContainer>
        <LineChart margin={{ top: 50, left: 0, bottom: 30, right: 0 }}>
          <XAxis dataKey="year" type="category" allowDuplicatedCategory={false}>
            <Label value="年度" offset={35} position="right" />
          </XAxis>
          <YAxis
            type="number"
            width={50}
            dataKey="value"
            tickFormatter={(tick: number) => (tick / 10000).toString()}
          >
            <Label value="人口数(万)" position={{ x: 80, y: -30 }} />
          </YAxis>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <Tooltip
            labelFormatter={(label: number) => `${label}年`}
            formatter={(value: number) => `${value.toLocaleString()}人`}
          />
          <Legend align="right" verticalAlign="top" layout="vertical" />
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

export default Chart;
