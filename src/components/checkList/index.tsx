import React from 'react';
import { Prefecture } from '../../types/prefecture';

import styles from './index.module.scss';

type Props = {
  result: Prefecture[];
  handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const CheckList: React.VFC<Props> = ({ result, handleCheck }) => (
  <div className={styles.checklist}>
    <ul>
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
  </div>
);

export default CheckList;
