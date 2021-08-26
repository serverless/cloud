import { useSnapshot } from "valtio";
import Button from "react-bootstrap/Button";
import authState from "../state/auth";

export default function Index() {
  const auth = useSnapshot(authState);

  if (auth.isLoading) {
    return null;
  }

  if (auth.error) {
    return (
      <div>
        <p>Oops... {auth.error.message}</p>
        <Button
          onClick={() => authState.logout({ returnTo: window.location.origin })}
        >
          Log out
        </Button>
      </div>
    );
  }

  return (
    <div className="d-flex vh-100 align-items-center">
      <div className="d-flex vw-100 flex-column align-items-center gap-5">
        <h1>Welcome to CloudChat</h1>
        <Button onClick={() => authState.login()}>Sign in with Auth0</Button>
        <p>Powered by Serverless ⚡️ Cloud</p>
      </div>
    </div>
  );
}
