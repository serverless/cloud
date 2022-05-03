import { useCallback } from "react";
import Link from "next/link";

import LinkButton from "@components/LinkButton";
import { useData } from "@lib/data";

export default function FileList() {
  const { data, error, mutate } = useData("/api/files");

  const handleDeleteClick = useCallback(
    (id) => {
      async function remove() {
        await fetch(`/api/files/${id}`, { method: "DELETE" });
        mutate();
      }
      remove();
    },
    [mutate]
  );

  if (!data || error) {
    return null;
  }

  return (
    <>
      {!data.length && <p>You have no files</p>}
      {data.length ? (
        <ul>
          {data.map(({ id, filename }) => (
            <li key={id}>
              <a href={`/api/files/${id}/download`}>{filename}</a>
              &nbsp;
              <Link href={`/files/${id}`}>Share</Link>
              &nbsp;
              <LinkButton onClick={() => handleDeleteClick(id)}>
                Delete
              </LinkButton>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
