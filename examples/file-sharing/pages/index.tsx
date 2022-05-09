import { useSnapshot } from "valtio";
import Main from "@components/Main";
import auth from "@state/auth";
import Login from "@components/Login";

import Upload from "@components/Upload";

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  footer: {
    margin: "50px auto",
    textAlign: "center",
  },
} as const;

export default function Home() {
  const { user } = useSnapshot(auth);

  return (
    <Main>
      <div style={styles.wrapper}>
        {!user ? <Login /> : <Upload />}
        <h6 style={styles.footer}>Made with &#10084; with Serverless Cloud</h6>
      </div>
    </Main>
  );
}
