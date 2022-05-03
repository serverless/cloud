import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { useRouter } from "next/router";

import Button from "@components/Button";
import authState from "@state/auth";

export default function Login() {
  const nameInputRef = useRef(null);
  const usernameInputRef = useRef(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
  }, [auth.user, router]);

  return (
    <div className="d-flex vw-100 flex-column align-items-center gap-5">
      <h1>Login</h1>
      <form>
        {auth.error && (
          <div className="alert alert-primary" role="alert">
            {auth.error}
          </div>
        )}
        {register && (
          <>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full name
              </label>
              <input
                id="name"
                ref={nameInputRef}
                type="text"
                name="name"
                tabIndex={1}
                className="form-control"
                value={name}
                autoFocus={register}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="text"
                name="email"
                tabIndex={1}
                className="form-control"
                value={email}
                autoFocus={register}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
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
            tabIndex={2}
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
            tabIndex={3}
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                e.preventDefault();
                register
                  ? authState.register({ name, username, password, email })
                  : authState.login({ username, password });
              }
            }}
          />
        </div>
        {!register && (
          <>
            <div>
              <Button
                tabIndex={4}
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
                tabIndex={5}
                onClick={() =>
                  authState.register({ username, name, password, email })
                }
              >
                Register
              </Button>
            </div>
            <div>
              <button
                type="button"
                tabIndex={6}
                className="btn btn-link mt-3 ps-0"
                onClick={() => setRegister(false)}
              >
                Already have an account? Click here to sign in
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
