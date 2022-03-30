import Head from "next/head";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import SSRProvider from "react-bootstrap/SSRProvider";

import SystemWarning from "@components/SystemWarning";
import "../style/index.css";

import auth from "@state/auth";

export default function MyApp({ Component, pageProps }) {
  const { systemWarning } = useSnapshot(auth);

  useEffect(() => {
    auth.init();
  }, []);

  return (
    <SSRProvider>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
        <script
          defer
          src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossOrigin=""
        ></script>
      </Head>
      {systemWarning && <SystemWarning message={systemWarning} />}
      <Component {...pageProps} />
    </SSRProvider>
  );
}
