import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useSnapshot } from "valtio";

import pluralize from "pluralize";
import clsx from "clsx";

import uploader from "@state/uploader";

import styles from "@styles/Upload.module.css";

export default function Upload() {
  const { busy, uploads } = useSnapshot(uploader);

  const onDropAccepted = useCallback((files) => {
    uploader.upload(files);
  }, []);

  const { isDragAccept, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
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
      {busy && (
        <p>
          Uploading {uploads.length} {pluralize("photos", uploads.length)}
        </p>
      )}
    </div>
  );
}
