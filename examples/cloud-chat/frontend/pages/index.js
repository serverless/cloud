import { useSnapshot } from "valtio";
import Home from "@views/Home";
import Unauthenticated from "@views/Unauthenticated";
import authState from "@state/auth";

export default function Index() {
  const auth = useSnapshot(authState);

  if (auth.isAuthenticated) {
    return <Home />;
  } else {
    return <Unauthenticated />;
  }
}
