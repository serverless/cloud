import { useSnapshot } from "valtio";
import Home from "@views/Home";
import Unauthenticated from "@views/Unauthenticated";
import authState from "@state/auth";
import SystemWarning from "@components/SystemWarning";

export default function Index() {
  const auth = useSnapshot(authState);

  return (
    <>
      {auth.systemWarning && <SystemWarning message={auth.systemWarning} />}
      {auth.isAuthenticated ? <Home /> : <Unauthenticated />}
    </>
  );
}
