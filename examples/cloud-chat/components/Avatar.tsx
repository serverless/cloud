export default function Avatar({ src, alt }) {
  return (
    <>
      <style jsx>{`
        img {
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }
      `}</style>
      <img src={src} alt={alt} />
    </>
  );
}
