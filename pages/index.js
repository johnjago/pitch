import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pitch Card Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Pitch Card Generator
        </h1>
        <div className={styles.grid}>
          <div className={styles.col}>
            <h2>Pitch name</h2>
            <input type="text" tabindex="1" />
            <input type="text" tabindex="4" />
            <input type="text" tabindex="7" />
            <input type="text" tabindex="10" />
            <input type="text" tabindex="13" />
            <input type="text" tabindex="16" />
            <input type="text" tabindex="19" />
            <input type="text" tabindex="22" />
            <input type="text" tabindex="25" />
            <input type="text" tabindex="28" />
          </div>
          <div className={styles.col}>
            <h2>Pitch abbreviation</h2>
            <input type="text" tabindex="2" />
            <input type="text" tabindex="5" />
            <input type="text" tabindex="8" />
            <input type="text" tabindex="11" />
            <input type="text" tabindex="14" />
            <input type="text" tabindex="17" />
            <input type="text" tabindex="20" />
            <input type="text" tabindex="23" />
            <input type="text" tabindex="26" />
            <input type="text" tabindex="29" />
          </div>
          <div className={styles.col}>
            <h2>Pitch %</h2>
            <input type="number" tabindex="3" />
            <input type="number" tabindex="6" />
            <input type="number" tabindex="9" />
            <input type="number" tabindex="12" />
            <input type="number" tabindex="15" />
            <input type="number" tabindex="18" />
            <input type="number" tabindex="21" />
            <input type="number" tabindex="24" />
            <input type="number" tabindex="27" />
            <input type="number" tabindex="30" />
          </div>
        </div>
        <button className={styles.button}>Make sheets</button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
