import Head from "next/head";

export default function Main({ children }) {
  return (
    <main style={{ marginTop: 10 }}>
      <Head>
        <title>Serverless Cloud File Sharing App</title>
        <meta name="description" content="Serverless Cloud File Sharing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </main>
  );
}
