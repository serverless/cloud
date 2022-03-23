import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { useRouter } from "next/router";

import Button from "@components/Button";
import authState from "@state/auth";

export default function Login() {
  const nameInputRef = useRef(null);
  const usernameInputRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [register, setRegister] = useState(false);

  const router = useRouter();
  const auth = useSnapshot(authState);

  useEffect(() => {
    if (register) {
      nameInputRef.current?.focus();
    } else {
      usernameInputRef.current?.focus();
    }
  }, [register]);

  useEffect(() => {
    if (auth.user) {
      router.push("/");
    }
  }, [auth.user]);

  return (
    <div className="d-flex vh-100 align-items-center">
      <div className="d-flex vw-100 flex-column align-items-center gap-5">
        <h1>Welcome to CloudPics</h1>
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
                ref={nameInputRef}
                type="text"
                name="name"
                tabIndex={0}
                className="form-control"
                value={name}
                autoFocus={register}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              ref={usernameInputRef}
              type="text"
              autoFocus={!register}
              tabIndex={1}
              name="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              tabIndex={2}
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => {
                if (e.code === "Enter") {
                  e.preventDefault();
                  register
                    ? authState.register({ name, username, password })
                    : authState.login({ username, password });
                }
              }}
            />
          </div>
          {!register && (
            <>
              <div>
                <Button
                  tabIndex={3}
                  onClick={() => authState.login({ username, password })}
                >
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
                  tabIndex={4}
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
