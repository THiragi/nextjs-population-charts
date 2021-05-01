import React from 'react';
import Head from 'next/head';
import { Header } from '../header';
import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export const Container: React.FC<Props> = ({
  children,
  title,
  description,
}) => (
  <div className={styles.container}>
    <Head>
      <title>{title}</title>
      <meta content={description} name="description" />

      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
    <Header title={title} />
    <main>{children}</main>
  </div>
);
