export const NEXT_PUBLIC_APP_URL =
  typeof window === "undefined"
    ? ""
    : window.location.hostname === "localhost"
    ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
    : `${window.location.protocol}//${window.location.hostname}`;

export const NEXT_PUBLIC_API_URL =
  typeof window === "undefined" || window.location.hostname === "localhost"
    ? process.env.NEXT_PUBLIC_API_URL
    : `${window.location.protocol}//${window.location.hostname}`;
