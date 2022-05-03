import Link from "next/link";

import { useSnapshot } from "valtio";

import LinkButton from "@components/LinkButton";
import auth from "@state/auth";

export default function Menu() {
  const { user } = useSnapshot(auth);
  return (
    <div>
      {!user && (
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      )}
      {user && (
        <>
          <p>Welcome {user.name}</p>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/upload">Upload files</Link>
            </li>
            <li>
              <LinkButton onClick={() => auth.logout()}>Logout</LinkButton>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
