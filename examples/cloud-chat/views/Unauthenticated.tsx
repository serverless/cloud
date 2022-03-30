import { useCallback, useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";

import Button from "@components/Button";
import authState from "../state/auth";

export default function Unauthenticated() {
  const nameInputRef = useRef(null);
  const usernameInputRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [register, setRegister] = useState(false);

  const auth = useSnapshot(authState);

  useEffect(() => {
    if (register) {
      nameInputRef.current?.focus();
    } else {
      usernameInputRef.current?.focus();
    }
  }, [register]);

  const onKeyUp = useCallback(
    (e) => {
      if (e.code === "Enter") {
        e.preventDefault();
        register
          ? authState.register({ name, username, password })
          : authState.login({ username, password });
      }
    },
    [name, password, register, username]
  );

  if (auth.busy) {
    return null;
  }

  return (
    <div className="d-flex vh-100 align-items-center">
      <div className="d-flex vw-100 flex-column align-items-center gap-5">
        <h1>Welcome to CloudChat</h1>
        <form>
          {auth.error && (
            <div className="alert alert-primary" role="alert">
              {auth.error}
            </div>
          )}
          {register && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyUp={onKeyUp}
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyUp={onKeyUp}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={onKeyUp}
            />
          </div>
          {!register && (
            <>
              <div>
                <Button onClick={() => authState.login({ username, password })}>
                  Sign in
                </Button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-link mt-3 ps-0"
                  onClick={() => setRegister(true)}
                >
                  No account yet? Click here to register
                </button>
              </div>
            </>
          )}
          {register && (
            <>
              <div>
                <Button
                  onClick={() =>
                    authState.register({ username, name, password })
                  }
                >
                  Register
                </Button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-link mt-3 ps-0"
                  onClick={() => setRegister(false)}
                >
                  Already have an account? Click here to sign in
                </button>
              </div>
            </>
          )}
        </form>
        <p>Powered by Serverless ⚡️ Cloud</p>
      </div>
    </div>
  );
}
