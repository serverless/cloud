import Head from 'next/head';

export default function Main({ children }) {
  return (
    <main>
      <Head>
        <title>Serverless Cloud File Sharing App</title>
        <meta name='description' content='Serverless Cloud File Sharing' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {children}
    </main>
  );
}
