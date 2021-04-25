import React from 'react';
import styles from './index.module.scss';

const Header: React.FC<{ title: string }> = ({ title }) => (
  <header className={styles.header}>
    <h1>{title}</h1>
  </header>
);

export default Header;
