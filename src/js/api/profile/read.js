import { API_AUCTION_PROFILES } from "../constants.js";
import { headers } from "../headers.js";
import { onLogOut } from "../../ui/global/logout.js";

window.onLogOut = onLogOut;

/**
 * Fetches and displays the profile information of a user based on their username.
 *
 * This function retrieves the bearer token from `localStorage`, checks if the user is authenticated,
 * and then fetches the user's profile data from the API. If the token is missing or invalid, the user is
 * prompted to log in. Upon successful retrieval of the profile data, it calls the `showProfile` function
 * to display the profile information.
 *
 * @param {string} username - The username of the profile to retrieve.
 * @returns {void} This function does not return a value, but it triggers a page redirection or updates
 * the DOM by calling `showProfile` with the retrieved profile data.
 * @throws {Error} Throws an error if the fetch request fails or if the bearer token is missing.
 */
export async function readProfile(username) {
  const bearerToken = localStorage.getItem("bearerToken");

  if (!bearerToken) {
    alert("Try logging in");
    location.replace("/");
  } else {
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
    showProfile(data.data);
  }
}

/**
 * Displays the profile information on the page.
 *
 * This function dynamically updates the HTML content of the profile section with the user's avatar, name,
 * bio, and statistics such as credits, listings, and wins. The profile data is expected to be passed as
 * an object that contains information like `avatar`, `name`, `bio`, `credits`, and counts of `listings` and
 * `wins` in the user's profile.
 *
 * @param {Object} profileData - The profile data of the user to be displayed.
 * @param {Object} profileData.avatar - The avatar information of the user.
 * @param {string} profileData.avatar.url - The URL of the avatar image.
 * @param {string} profileData.name - The name of the user.
 * @param {string} profileData.bio - The biography of the user.
 * @param {number} profileData.credits - The number of credits the user has.
 * @param {Object} profileData._count - Object containing counts for listings and wins.
 * @param {number} profileData._count.listings - The number of listings the user has created.
 * @param {number} profileData._count.wins - The number of wins the user has had.
 * @returns {void} This function does not return a value; it modifies the DOM by injecting profile information.
 */
export function showProfile(profileData) {
  const profileSection = document.querySelector(".profileSection");
  profileSection.innerHTML += `
    <div class="flex flex-col items-center">
    <img src="${profileData.avatar.url}" alt="Profile picture" class="rounded-full w-20 h-20 md:h-28 md:w-28">
    <h2 class="text-sm font-bold md:text-lg">${profileData.name}</h2>
    <p class="text-sm w-60 md:w-80">${profileData.bio}</p>
    </div>

    <section class="flex gap-10">
      <div class="flex gap-1">
        <p class="font-bold">${profileData.credits}</p>
        <p>Credits</p>
      </div>

      <div class="flex gap-1">
        <p class="font-bold">${profileData._count.listings}</p>
        <p>Listings</p>
      </div>

      <div class="flex gap-1">
        <p class="font-bold">${profileData._count.wins}</p>
        <p>Wins</p>
      </div>
    </section>
      `;
}
