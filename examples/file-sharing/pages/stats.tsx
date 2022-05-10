import Main from "@components/Main";
import Stats from "@components/Stats";

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

export default function OpenPage() {
  return (
    <Main>
      <div style={styles.wrapper}>
        <Stats />
        <h6 style={styles.footer}>Made with &#10084; with Serverless Cloud</h6>
      </div>
    </Main>
  );
}
