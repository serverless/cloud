import { useEffect } from "react";
import { useSnapshot } from "valtio";
import SSRProvider from "react-bootstrap/SSRProvider";

import SystemWarning from "@components/SystemWarning";
import auth from "@state/auth";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const { systemWarning } = useSnapshot(auth);

  useEffect(() => {
    auth.init();
  }, []);

  return (
    <SSRProvider>
      {systemWarning && <SystemWarning message={systemWarning} />}
      <Component {...pageProps} />
    </SSRProvider>
  );
}

export default MyApp;
