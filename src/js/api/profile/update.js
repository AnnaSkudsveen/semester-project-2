import { headers } from "../headers.js";
import { API_AUCTION_PROFILES } from "../constants.js";

const profileEditP = document.querySelector(".profileEditP");

/**
 * Updates a user's profile with a new biography and avatar image.
 *
 * This function sends a PUT request to the server to update the profile of the user with the provided
 * `username`, `bio`, and `image` URL. If the update is successful, the function redirects to the updated
 * profile page; if there is an error, it displays an error message.
 *
 * @param {string} username - The username of the user whose profile is being updated.
 * @param {string} bio - The new biography for the user.
 * @param {string} image - The URL of the new avatar image for the user.
 * @returns {Promise<Object>} The response data from the server after updating the profile.
 * @throws {Error} Throws an error if the request fails or if the response is not ok.
 */
export async function updateProfile(username, bio, image) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers()
    },
    body: JSON.stringify({
      bio: `${bio}`,
      avatar: {
        url: `${image}`
      }
    })
  };

  try {
    const response = await fetch(
      `${API_AUCTION_PROFILES}/${username}`,
      options
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error updating listing:", errorData);
      profileEditP.innerHTML = "";
      profileEditP.innerHTML += `
      <p class="text-alertRed-700 text-base"> ${errorData.errors[0].message}</p>
      `;
    }

    const data = await response.json();
    console.log("Profile updated successfully:", data);
    window.location.href = `/html/profile/?user=${username}`;
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
