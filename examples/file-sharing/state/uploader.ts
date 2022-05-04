import { proxy, ref } from "valtio";
import { mutate } from "swr";

type Upload = {
  file: File;
};

class UploadState {
  uploads: Upload[] = [];
  busy = false;
  errorMessage?: string;

  async upload(files: File[]) {
    for (const file of files) {
      this.uploadSingleFile(file);
    }
  }

  async uploadSingleFile(file: File) {
    this.uploads.push({ file: ref(file) });
    this.busy = true;

    const result = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: file.name,
      }),
    });

    if (result.ok) {
      const { url } = await result.json();
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
    } else {
      const { message } = await result.json();
      this.errorMessage = message;
    }

    this.uploads = this.uploads.filter(
      (upload) => upload.file.name !== file.name
    );
    this.busy = this.uploads.length > 0;

    mutate("/api/files");
  }
}

export default proxy(new UploadState());
