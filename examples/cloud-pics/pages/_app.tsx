import { useEffect } from "react";
import { useSnapshot } from "valtio";
import SSRProvider from "react-bootstrap/SSRProvider";

import SystemWarning from "@components/SystemWarning";
import "@styles/globals.css";

import auth from "@state/auth";

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
