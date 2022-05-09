import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { useRouter } from "next/router";

import authState from "@state/auth";
import ErrorMessage from "./ErrorMessage";

export default function Login() {
  const nameInputRef = useRef(null);
  const usernameInputRef = useRef(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <div
      style={{
        width: 400,
        margin: " auto",
      }}
    >
      <h2 style={{ marginBottom: 10 }}>{register ? "Sign up" : "Login"}</h2>
      <form>
        {auth.error && <ErrorMessage message={auth.error} />}
        {register && (
          <>
            <div>
              <label htmlFor="name">Full name</label>
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
            <div>
              <label htmlFor="email">Email</label>
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

        <div>
          <label htmlFor="username">Username</label>
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
          <label htmlFor="password">Password</label>
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

        <div>
          <button
            aria-busy={loading ? "true" : "false"}
            tabIndex={5}
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);
              if (register) {
                await authState.register({ username, name, password, email });
              } else {
                await authState.login({ username, password });
              }
              setLoading(false);
            }}
          >
            {register ? "Sign up" : "Sign in"}
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <a
            style={{ fontSize: 15 }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setRegister(!register);
            }}
          >
            {register
              ? "Already have an account? Click here to sign in"
              : "No account yet? Click here to register"}
          </a>
        </div>
      </form>
    </div>
  );
}
