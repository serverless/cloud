import Image from "next/image";
import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function HomePage({ items }) {
  return (
    <div className={styles.grid}>
      {items?.map(({ id, url, username, width, height }) => (
        <Link key={id} href={`/images/${id}`}>
          <a className={styles.card}>
            <p>{username}</p>
            <Image
              alt={`Image uploaded by ${username}`}
              src={url}
              width={width}
              height={height}
            ></Image>
          </a>
        </Link>
      ))}
    </div>
  );
}
