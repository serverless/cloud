import data from "../lib/data";

export function user() {
  return async function middleware(req, res, next) {
    req.user = await data.getUserForSub(req.token.sub);
    return next();
  };
}
