import { Navbar, Switch, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes'
import Head from 'next/head';
import { Profile } from '../components/profile';
import styles from '../styles/Here.module.css';

export default function Here({ data = {}}) {

  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <div className={styles.container}>
      <Head>
        <title>Find Me Here</title>
        <meta name="description" content="See the person you're looking for and where you are compared to them" />
      </Head>
      <Navbar isBordered variant={'floating'}>
        <Navbar.Content>
        </Navbar.Content>
        <Navbar.Content>
          <Switch
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          />
          <Profile />
        </Navbar.Content>
      </Navbar>
      <main className={styles.searchmain}>
        {/* <SearchComponent renderedData={data} /> */}
      </main>
    </div>
  )
}
