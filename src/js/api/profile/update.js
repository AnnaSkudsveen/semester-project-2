import { headers } from "../headers.js";
import { API_AUCTION_PROFILES } from "../constants.js";

export async function updateProfile(username, bio, image, banner) {
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
      },
      banner: {
        url: `${banner}`
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
      console.error("Error updating profile:", errorData);
      throw new Error(`Error ${response.status}: ${errorData.message}`);
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
