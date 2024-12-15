import { API_AUCTION_POSTS } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Deletes an auction listing by sending a DELETE request to the API.
 *
 * This function sends a DELETE request to the auction API to remove the listing identified by the given `id`.
 * If the deletion is successful, the page is redirected to the homepage. If the request fails, it logs the error and throws an error.
 *
 * @async
 * @function deleteListing
 * @param {string|number} id - The unique identifier of the auction listing to be deleted.
 * @throws {Error} Throws an error if the DELETE request fails or the response status is not OK.
 */
export async function deleteListing(id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...headers()
    }
  };

  try {
    const response = await fetch(`${API_AUCTION_POSTS}/${id}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error deleting", errorData);
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }

    window.location.href = "/";
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
