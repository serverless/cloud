import Head from "next/head";

import styles from "@styles/Main.module.css";

export default function Main({ children }) {
  return (
    <div className={styles.root}>
      <Head>
        <title>Cloud Analytics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
