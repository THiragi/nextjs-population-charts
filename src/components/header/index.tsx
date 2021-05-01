import React from 'react';
import styles from './index.module.scss';

export const Header: React.VFC<{ title: string }> = ({ title }) => (
  <header className={styles.header}>
    <h1>{title}</h1>
  </header>
);
