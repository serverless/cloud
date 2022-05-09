import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useSnapshot } from "valtio";

import pluralize from "pluralize";
import uploader from "@state/uploader";
import FileList from "./FileList";
import { useData } from "@lib/data";

export default function Upload() {
  const { data, error, mutate } = useData("/api/files");
  const { busy, uploads, errorMessage } = useSnapshot(uploader);

  const onDropAccepted = useCallback(
    async (files) => {
      await uploader.upload(files);
      mutate();
    },
    [mutate]
  );

  const { isDragAccept, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDropAccepted,
    });

  const styles = {
    dropzone: {
      width: "100%",
      minHeight: "300px",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fafafa",
      padding: "1rem",
      color: "#888",
      border: "1px dashed #ddd",
      borderColor: isDragAccept ? "#fd5750" : "#ddd",
      margin: "2rem 0",
    },
  } as const;

  return (
    <div>
      <div style={styles.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop files here</p>
        ) : busy ? (
          <div aria-busy="true">
            Uploading {uploads.length} {pluralize("files", uploads.length)}
          </div>
        ) : (
          <div>
            <p>Drag {"'n'"} drop some files here, or click to select files</p>
            <button>Upload</button>
          </div>
        )}
      </div>
      <FileList data={data} mutate={mutate} error={error} />
      {errorMessage && (
        <div className="error">
          <p>Received error: &quot;{errorMessage}&quot;</p>
        </div>
      )}
    </div>
  );
}
