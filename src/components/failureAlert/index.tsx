import React from 'react';
import { Prefecture } from '../../types/prefecture';

import styles from './index.module.scss';

type Props = {
  failures: Prefecture[];
};

const FailureAlert: React.VFC<Props> = ({ failures }) => (
  <div className={styles.alert}>
    <h3>以下の都道府県のデータの取得に失敗しています</h3>
    <ul>
      {failures.map((failure) => (
        <li key={failure.prefCode}>{failure.prefName}</li>
      ))}
    </ul>
  </div>
);

export default FailureAlert;
