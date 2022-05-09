import { useCallback, useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import Image from "next/image";
import Link from "next/link";

import trash from "../styles/trash.svg";

const styles = {
  filebox: {
    borderRadius: "6px",
    border: "1px solid #d4d4d4",
    display: "flex",
    padding: "10px",
    fontSize: "14px",
    textDecoration: "none",
  },
  fileboxInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    textDecoration: "none",
  },
  fileBoxIcon: {
    width: "50px",
    marginRight: "15px",
  },
  fileBoxName: {
    width: "280px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: "0",
    fontSize: "14px",
  },
  fileBoxButton: {
    marginBottom: "0",
    marginRight: "5px",
    padding: "0px 10px",
    display: "inline-flex",
    alignItems: "center",
    fontSize: "14px",
    width: "auto",
    justifyContent: "space-between",
    borderColor: "#d4d4d4",
  },
} as const;

export default function FileList({ mutate, data, error }) {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleDeleteClick = useCallback(
    (id) => {
      async function remove() {
        setLoadingDelete(true);
        await fetch(`/api/files/${id}`, { method: "DELETE" });
        await mutate();
        setLoadingDelete(false);
      }
      remove();
    },
    [mutate]
  );

  const loadingFiles = !data && !error;
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <h5 aria-busy={loadingDelete || loadingFiles ? "true" : "false"}>
        My Files
      </h5>
      {!loadingFiles && !data?.length && <p>You have no files</p>}
      {data?.length ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          {data?.reverse().map(({ id, filename, ext }) => (
            <a key={id} href={`/files/${id}`} style={styles.filebox}>
              <>
                <div style={styles.fileBoxIcon}>
                  <FileIcon
                    extension={ext}
                    {...defaultStyles}
                    color="#FD5750"
                  />
                </div>
                <div style={styles.fileboxInner}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button
                      style={styles.fileBoxButton}
                      className="outline secondary"
                    >
                      Open
                    </button>

                    <Image
                      src={trash}
                      alt="delete"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteClick(id);
                      }}
                    />
                  </div>
                  <h6 style={styles.fileBoxName}>{filename}</h6>
                </div>
              </>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
