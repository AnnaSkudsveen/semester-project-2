import { API_KEY } from "./constants.js";

/**
 * Generates the headers object used for API requests.
 *
 * This function constructs the headers object by adding necessary headers such as the `Content-Type`,
 * the `X-Noroff-API-Key` (if defined), and an `Authorization` header (if a bearer token is available in
 * local storage). These headers are used for making authenticated API requests to the server.
 *
 * @returns {Object} An object representing the headers for API requests.
 *
 * @example
 * const requestHeaders = headers();
 * console.log(requestHeaders); // { "Content-Type": "application/json", "Authorization": "Bearer <token>" }
 */
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
