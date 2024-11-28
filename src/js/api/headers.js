import { API_KEY } from "./constants";

export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  const authToken = localStorage.getItem(token);
  if (authToken) {
    headers.append("Authorization", `Bearer ${authToken}`);
  }

  return headers;
}
