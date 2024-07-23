import Cookies from "js-cookie";

const COOKIE_NAME = "access-token-nusaventure";

export function setAccessToken(token: string) {
  Cookies.set(COOKIE_NAME, token);
}

export function getAccessToken() {
  return Cookies.get(COOKIE_NAME);
}
