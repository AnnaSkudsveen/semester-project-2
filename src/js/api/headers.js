import { API_KEY } from "./constants.js";

export function headers() {
  const authToken = localStorage.getItem("bearerToken");
  const headers = {
    "Content-Type": "application/json"
  };

  if (API_KEY) {
    headers["X-Noroff-API-Key"] = API_KEY;
  }

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return headers;
}
