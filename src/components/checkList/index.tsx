import React from 'react';
import { Prefecture } from '../../types/prefecture';
import styles from './index.module.scss';

type Props = {
  result: Prefecture[];
  failures: number[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (code: number, name: string) => Promise<void>;
};

export const CheckList: React.VFC<Props> = ({
  result,
  failures,
  handleChange,
  handleClick,
}) => (
  <div className={styles.checklist}>
    {failures.length !== 0 && (
      <p className={styles.alert}>
        データの取得に失敗している都道府県があります
      </p>
    )}
    <ul>
      {result.map((data) => (
        <li
          key={data.prefCode}
          className={failures.includes(data.prefCode) ? styles.failure : ''}
        >
          <label htmlFor={`pref-${data.prefCode}`}>
            <input
              id={`pref-${data.prefCode}`}
              type="checkbox"
              value={data.prefCode}
              onChange={handleChange}
              onClick={() => handleClick(data.prefCode, data.prefName)}
            />
            {data.prefName}
          </label>
        </li>
      ))}
    </ul>
  </div>
);
