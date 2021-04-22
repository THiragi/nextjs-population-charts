import { InferGetServerSidePropsType, NextPage } from 'next';
import { getAllPrefectures } from '../lib/fetcher';

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<PageProps> = ({ result }) => (
  <div>
    <h1>都道府県一覧</h1>
    <ul>
      {result.map((data) => (
        <li key={data.prefCode}>
          <input
            id={`pref-${data.prefCode}`}
            type="checkbox"
            value={data.prefCode}
          />
          <label htmlFor={`pref-${data.prefCode}`}>{data.prefName}</label>
        </li>
      ))}
    </ul>
  </div>
);

export const getServerSideProps = async () => {
  const { result } = await getAllPrefectures();

  return {
    props: {
      result,
    },
  };
};

export default Home;
