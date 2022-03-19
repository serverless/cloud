import "@styles/globals.css";

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <SafeHydrate>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={"/tracking/pixel.gif"} alt="analytics pixel" />
      <Component {...pageProps} />
    </SafeHydrate>
  );
}
