import Authorized from "@components/Authorized";
import Main from "@layout/Main";
import Upload from "@views/Upload";

export default function UploadPage() {
  return (
    <Authorized>
      <Main>
        <Upload />
      </Main>
    </Authorized>
  );
}
