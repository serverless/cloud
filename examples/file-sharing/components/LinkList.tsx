import { useCallback } from "react";
import { useData } from "@lib/data";

import LinkButton from "@components/LinkButton";

export default function LinkList({ fileid }) {
  const { data: links, mutate } = useData(`/api/files/${fileid}/links`);

  const handleDeleteClick = useCallback(
    (id) => {
      async function remove() {
        await fetch(`/api/links/${id}`, { method: "DELETE" });
        mutate();
      }
      remove();
    },
    [mutate]
  );

  return links?.length ? (
    <ul>
      {links.map((link) => (
        <li key={link.id}>
          <a href={link.url}>{link.id}</a>
          &nbsp;
          <span>Expires: {link.expires}</span>
          &nbsp;
          <LinkButton onClick={() => navigator.clipboard.writeText(link.url)}>
            Copy to clipboard
          </LinkButton>
          &nbsp;
          <LinkButton onClick={() => handleDeleteClick(link.id)}>
            Delete
          </LinkButton>
        </li>
      ))}
    </ul>
  ) : (
    <p>File is not currently shared</p>
  );
}
