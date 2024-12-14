import { headers } from "../headers.js";
import { API_AUCTION_PROFILES } from "../constants.js";

const profileEditP = document.querySelector(".profileEditP");

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
