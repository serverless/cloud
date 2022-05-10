import { useEffect } from "react";
import { useSnapshot } from "valtio";

import SystemWarning from "@components/SystemWarning";
import auth from "@state/auth";
import Link from "next/link";

import Image from "next/image";
import Loading from "@components/Loading";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  const { systemWarning, user, loading } = useSnapshot(auth);

  useEffect(() => {
    auth.init();
  }, []);

  if (loading) {
    return <Loading width="100vw" height="100vh" />;
  }
  return (
    <div>
      {systemWarning && <SystemWarning message={systemWarning} />}
      <div style={{ background: "black" }}>
        <nav className="container">
          <ul>
            <li>
              <Link href="/">
                <a style={{ display: "flex", color: "#fff" }}>
                  <strong>Share Files</strong>
                </a>
              </Link>
            </li>
          </ul>
          <ul>
            <li style={{ display: "flex" }}>
              <Image
                width={250}
                height={40}
                src="/serverless-cloud.svg"
                alt="serverless cloud"
              />
            </li>
          </ul>
          <ul>
            <li>
              {user ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    auth.logout();
                  }}
                >
                  Logout
                </a>
              ) : (
                <Link href="/">
                  <a role="button">Login</a>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      {/* {systemWarning && <SystemWarning message={systemWarning} />} */}
      <div className="container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
