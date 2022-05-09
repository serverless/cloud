import { useState } from "react";
import { useRouter } from "next/router";
import { useData, useFile } from "@lib/data";
import { FileIcon, defaultStyles } from "react-file-icon";

import Main from "@components/Main";

import Loading from "@components/Loading";
import ErrorMessage from "@components/ErrorMessage";

export default function FilePage() {
  const { query } = useRouter();
  const {
    data: links,
    error,
    mutate,
  } = useData(`/api/files/${query.id}/links`);
  const { file, error: fileError } = useFile(query.id);

  const [loading, setLoading] = useState(false);
  const loadingLinks = !links && !error;
  const loadingFile = !file && !fileError;
  const handleCreateLinkClick = async () => {
    setLoading(true);
    await fetch(`/api/files/${query.id}/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    mutate();
    setLoading(false);
  };
  const handleDeleteClick = async (id) => {
    await fetch(`/api/links/${id}`, { method: "DELETE" });
    mutate();
  };
  if (loadingFile) {
    return <Loading width="100%" height="300px" />;
  }
  return (
    <Main>
      {error && <ErrorMessage message={error.message} />}
      {file ? (
        <div>
          <a
            href={`/api/files/${file.id}/download`}
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #d4d4d4",
              borderRadius: 5,
              padding: 20,
              margin: "40px 0",
            }}
          >
            <div
              style={{
                width: 100,
                marginRight: 50,
              }}
            >
              <FileIcon
                extension={file?.ext}
                {...defaultStyles}
                color="#FD5750"
              />
            </div>
            <h3 style={{ marginBottom: 0 }}>{file.filename}</h3>
          </a>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Shared Links</h4>
            <button
              style={{ width: 300 }}
              onClick={handleCreateLinkClick}
              disabled={!!loading}
              aria-busy={loading ? "true" : "false"}
            >
              {loading ? "Loading" : "Create a share link"}
            </button>
          </div>

          {loadingLinks ? (
            <Loading width="100%" height="500px" />
          ) : !links?.length ? (
            <p>File is not currently shared</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              {links.map((link) => (
                <div
                  key={link.id}
                  style={{
                    border: "1px solid #d4d4d4",
                    padding: 20,
                    borderRadius: 6,
                  }}
                >
                  <a href={link.url}>ID: {link.id}</a>
                  &nbsp;
                  <p style={{ marginBottom: 0 }}>
                    Expires: {new Date(link.expires).toLocaleString()}
                  </p>
                  &nbsp;
                  <button
                    onClick={() => navigator.clipboard.writeText(link.url)}
                  >
                    Copy to clipboard
                  </button>
                  <button
                    className="secondary outline"
                    onClick={() => handleDeleteClick(link.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>File not found</p>
      )}
    </Main>
  );
}
