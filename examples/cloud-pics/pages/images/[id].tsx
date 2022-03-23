import Image from "next/image";
import Main from "@layout/Main";

import { getImageById } from "../../lib/images";

export default function ImagePage({ image }) {
  const { url, width, height, username } = image;
  return (
    <Main>
      <p>{username}</p>
      <Image
        alt={`Image uploaded by ${username}`}
        src={url}
        width={width}
        height={height}
      ></Image>
    </Main>
  );
}

export async function getServerSideProps({ req, params }) {
  const image = await getImageById(params.id);
  return { props: { image } };
}
