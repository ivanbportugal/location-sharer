import Head from 'next/head';
import styles from '../styles/Here.module.css';

export default function Search({ data = {}}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Find Me Here</title>
        <meta name="description" content="See the person you're looking for and where you are compared to them" />
      </Head>
      <main className={styles.searchmain}>
        {/* <SearchComponent renderedData={data} /> */}
      </main>
    </div>
  )
}
