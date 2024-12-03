import { API_AUCTION_POSTS } from "../constants.js";
import { headers } from "../headers.js";

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
