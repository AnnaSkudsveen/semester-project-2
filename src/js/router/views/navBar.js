import { API_AUCTION_PROFILES } from "../../api/constants.js";
import { headers } from "../../api/headers.js";

const navBar = document.querySelector(".navBar");
const bearerToken = localStorage.getItem("bearerToken");

/**
 * Fetches user profile data and updates the navigation bar based on the user's login status.
 *
 * This function retrieves the profile data for the given username and dynamically updates the
 * navigation bar (`navBar`) with links to the home page, the user's profile, the create listing page,
 * and displays the user's credits if they are logged in. It also adds a "Log out" button if the user is logged in.
 *
 * @param {string} username - The username of the logged-in user whose profile data is used to update the navbar.
 *
 * @throws {Error} Throws an error if the user profile data cannot be retrieved or if there is an issue with the API request.
 *
 * @example
 * showNavBar("johndoe"); // Updates the navigation bar with the profile of the user "johndoe".
 */
export async function showNavBar(username) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        ...headers()
      }
    };

    const response = await fetch(
      `${API_AUCTION_PROFILES}/${username}`,
      options
    );
    const data = await response.json();
    if (bearerToken) {
      navBar.innerHTML += `
      <a href="/" class="flex gap-1 items-center hover:text-primary-500 active:text-primary-500">
        <i class="ph ph-house-simple text-xl"></i>

        <p class="hidden lg:block">Home</p>
      </a>

      <a href="/html/profile/?user=${username}" class="flex gap-1 items-center hover:text-primary-500 active:text-primary-500">
        <i class="ph ph-user text-xl"></i>
        <p class="hidden lg:block">Profile</p>
      </a>
   
      <a href="/html/listing/create/" class="flex gap-1 items-center hover:text-primary-500 active:text-primary-500">
        <i class="ph ph-plus"></i>

        <p class="hidden lg:block">Create listing</p>
      </a>

      <div class="flex gap-1 items-center ">
        
        <p>${data.data.credits}</p>
        <p class="hidden md:block">Credits</p>
      </div>
      <button id="logOutBtn" onclick="onLogOut(event)" class="text-primary-500 hover:underline">Log out</button>
    `;
    }
  } catch (error) {
    console.error("An error has occurred:", error.message);
    throw error;
  }
}
