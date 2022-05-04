import { useCallback } from "react";
import { useRouter } from "next/router";
import { useFile } from "@lib/data";
import { mutate } from "swr";

import Main from "@components/Main";
import Button from "@components/Button";
import LinkList from "@components/LinkList";

export default function FilePage() {
  const router = useRouter();

  const { file, error } = useFile(router.query.id);

  const handleShareClick = useCallback(() => {
    async function share() {
      await fetch(`/api/files/${router.query.id}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      mutate(`/api/files/${router.query.id}/links`);
    }
    share();
  }, [router.query.id]);

  return (
    <Main>
      {error && (
        <div className="alert alert-primary" role="alert">
          {error.message}
        </div>
      )}
      {file ? (
        <>
          <h1>File: {file.filename}</h1>
          <LinkList fileid={router.query.id} />
          <Button onClick={handleShareClick}>Create a link</Button>
        </>
      ) : (
        <p>File not found</p>
      )}
    </Main>
  );
}
