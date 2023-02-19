import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useTheme as useNextTheme } from 'next-themes'
import { Navbar, Switch, Text, useTheme } from '@nextui-org/react';
import { Profile } from '../components/profile';
import dynamic from 'next/dynamic';
import { SSRProvider } from "@react-aria/ssr";

const Positioner = dynamic(() => import('../components/positioner'), {
  ssr: false,
})


export default function Home({ data = {} }) {

  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <SSRProvider>
    <div className={styles.container}>
      <Head>
        <title>Find Me!</title>
        <meta name="description" content="Share your location to a friend" />
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
      <main className={styles.main}>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $red600 50%",
          }}
          weight="bold"
        >
          Fry Me?! No, FIND me.
        </Text>        

        <div className={styles.description}>
          <div className={styles.card}>
            <p style={{fontWeight: 'bold'}}>Instructions</p>
            <ul className={styles.stylelinks}>
              <li>
                <p style={{textDecoration: 'underline'}}>Step 1</p>
                <p>Track your location</p>
              </li>
              <li>
                <p style={{textDecoration: 'underline'}}>Step 2</p>
                <p>Share it to a friend</p>
              </li>
              <li>
                <p style={{textDecoration: 'underline'}}>Step 3</p>
                <p>Your friend uses the link to find you.</p>
              </li>
            </ul>

            <p style={{fontWeight: 'bold'}}>FAQ</p>
            <ul className={styles.stylelinks}>
              <li>
                <p style={{textDecoration: 'underline'}}>Do you want money for your work?</p>
                <p>No, but you can always <a target='_blank' rel="noreferrer" href='https://buymeacoffee.com/ivanportugal'>Buy Me a Coffee</a></p>
              </li>
              <li>
                <p style={{textDecoration: 'underline'}}>Do you track me?</p>
                <p>Nope. Sharing is done from your device to theirs. I know nothing.</p>
              </li>
              <li>
                <p style={{textDecoration: 'underline'}}>I have a feature request and / or see a bug. (Or I just have more questions and comments)</p>
                <p><a href='mailto:ivanbportugal@gmail.com'>Email</a> me or <a target='_blank' rel="noreferrer" href='https://buymeacoffee.com/ivanportugal'>Buy Me a Coffee</a> with your request.</p>
              </li>
            </ul>
          </div>
        </div>

        <hr />
        <Positioner />
        
      </main>

      <footer className={styles.footer}>
          <span className={styles.stylelinks}>Powered by <a target='_blank' rel="noreferrer" href='https://buymeacoffee.com/ivanportugal'>coffee</a>.</span>
      </footer>
    </div>
    </SSRProvider>
  )
}
