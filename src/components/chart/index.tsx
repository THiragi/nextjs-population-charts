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
const colorCode = [...Array(48)].map((_, i) => assignColorCode(i, 48, 210, 50));

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
          <YAxis dataKey="value" width={80}>
            <Label value="人口数" offset={30} position="top" />
          </YAxis>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <Tooltip />
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
