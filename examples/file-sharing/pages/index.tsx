import { useSnapshot } from "valtio";

import Main from "@components/Main";
import FileList from "@components/FileList";

import auth from "@state/auth";

export default function Home() {
  const { user } = useSnapshot(auth);

  return (
    <div>
      <Main>
        <h1>Serverless Cloud File Sharing App</h1>
        {user && <FileList />}
        {!user && <p>Please login to see your files</p>}
      </Main>
    </div>
  );
}
