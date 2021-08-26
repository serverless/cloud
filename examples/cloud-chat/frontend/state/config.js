export const NEXT_PUBLIC_AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
export const NEXT_PUBLIC_AUTH0_CLIENT_ID =
  process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
export const NEXT_PUBLIC_AUTH0_AUDIENCE =
  process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;

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
