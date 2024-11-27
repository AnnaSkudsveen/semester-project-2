import { API_KEY } from "./constants";

export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  const token = localStorage.getItem(token);
  if (token) {
    headers.append("token", token);
  }

  return headers;
}
