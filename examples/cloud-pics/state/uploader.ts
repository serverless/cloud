import { proxy } from "valtio";
import { mutate } from "swr";

class Uploader {
  uploads = [];
  busy;

  async upload(files) {
    for (const file of files) {
      this.uploadSingleFile(file);
    }
  }

  async uploadSingleFile(file) {
    this.uploads.push(file);
    this.busy = true;

    const result = await fetch("/api/upload-url", {
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
    }

    this.uploads = this.uploads.filter((f) => f.path !== file.path);
    this.busy = this.uploads.length > 0;

    mutate("/api/images");
  }
}

export default proxy(new Uploader());
