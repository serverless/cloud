import { useSnapshot } from "valtio";
import Head from "next/head";

import TopNavbar from "@components/TopNavbar";

import styles from "@styles/Main.module.css";
import authState from "@state/auth";

export default function Main({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>CloudPics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavbar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
