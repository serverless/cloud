import Main from "@layout/Main";
import Home from "@views/Home";
import useSWR from "swr";

import { getImages } from "../lib/images";

const fetcher = (key) => fetch(key).then((res) => res.json());

export default function HomePage({ data }) {
  const { data: images } = useSWR("/api/images", fetcher, {
    fallbackData: data,
  });

  return (
    <Main>
      <Home items={images?.items} />
    </Main>
  );
}

export async function getServerSideProps({ req }) {
  const images = await getImages();
  return {
    props: {
      data: images,
    },
  };
}
