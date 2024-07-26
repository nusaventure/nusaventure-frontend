import Cookies from "js-cookie";

const COOKIE_NAME = "access-token-nusaventure";

export function setAccessToken(token: string) {
  Cookies.set(COOKIE_NAME, token, { sameSite: "None", secure: true });
}

export function removeAccessToken() {
  Cookies.remove(COOKIE_NAME, { sameSite: "None", secure: true });
}

export function getAccessToken() {
  return Cookies.get(COOKIE_NAME);
}
