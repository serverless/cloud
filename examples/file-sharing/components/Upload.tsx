import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useSnapshot } from "valtio";

import pluralize from "pluralize";
import clsx from "clsx";

import uploader from "@state/uploader";

import styles from "./Upload.module.css";

export default function Upload() {
  const { busy, uploads, errorMessage } = useSnapshot(uploader);

  const onDropAccepted = useCallback((files) => {
    uploader.upload(files);
  }, []);

  const { isDragAccept, getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
  });

  return (
    <div className={styles.root}>
      <div
        className={clsx(styles.dropzone, isDragAccept && "active")}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>Drag {"'n'"} drop some files here, or click to select files</p>
      </div>
      {errorMessage && (
        <div className="error">
          <p>Received error: &quot;{errorMessage}&quot;</p>
        </div>
      )}
      {busy && (
        <p>
          Uploading {uploads.length} {pluralize("files", uploads.length)}
        </p>
      )}
    </div>
  );
}
