import { API_AUTH_KEY } from "../constants.js";

/**
 * Fetches an API key by sending a POST request to the authentication API.
 *
 * This function sends a request with a payload containing the name `API_KEY` to retrieve an API key from the server.
 * It returns the result as a JSON object if the request is successful.
 * In case of an error, it logs the error and rethrows it.
 *
 * @async
 * @function getKey
 * @throws {Error} Throws an error if the fetch request fails, or if the response status is not OK.
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the API, containing the API key.
 */
export async function getKey() {
  try {
    const response = await fetch(API_AUTH_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: "API_KEY" })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
