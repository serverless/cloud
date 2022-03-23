import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";

import auth from "@state/auth";

export default function Authorized({ children }) {
  const router = useRouter();
  const { user } = useSnapshot(auth);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return <>{children}</>;
}
