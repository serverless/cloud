import Head from "next/head";

import Menu from "@components/Menu";

export default function Main({ children }) {
  return (
    <main className="m-4">
      <Head>
        <title>Serverless Cloud File Sharing App</title>
        <meta name="description" content="Serverless Cloud File Sharing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      {children}
    </main>
  );
}
