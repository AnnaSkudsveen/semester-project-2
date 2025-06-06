import { API_AUCTION_PROFILES } from "../../api/constants.js";
import { headers } from "../../api/headers.js";
import { onUpdateProfile } from "../../ui/profile/update.js";
import { showNavBar } from "./navBar.js";
import { onLogOut } from "../../ui/global/logOut.js";
import { onSearch } from "../../ui/listing/search.js";

window.onLogOut = onLogOut;

const username = localStorage.getItem("author");
const bearerToken = localStorage.getItem("bearerToken");
const user = localStorage.getItem("author");
const form = document.forms.updateProfile;
const profileEditP = document.querySelector(".profileEditP");

showNavBar(username);
if (searchForm) {
  searchForm.addEventListener("submit", onSearch);
}

/**
 * Fetches the profile data for the specified username and populates the profile form with the user's information.
 *
 * This function sends a request to retrieve the profile data for a given user, using the provided `username`.
 * It checks if the user is logged in by verifying the `bearerToken`. If not logged in, the user is redirected
 * to the login page. Upon successful retrieval, the form fields for bio and avatar image are populated with
 * the user's profile data. If an error occurs during the fetch request, an error message is displayed.
 *
 * @param {string} username - The username of the user whose profile data is to be fetched.
 *
 * @throws {Error} Throws an error if the user profile data cannot be fetched or if the request fails.
 *
 * @example
 * getProfile("johndoe"); // Fetches and populates the profile form with the data for the user "johndoe".
 */
async function getProfile(username) {
  if (!bearerToken) {
    alert("Try logging in");
    location.href = "/";
  } else {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...headers()
      }
    };

    const response = await fetch(
      `${API_AUCTION_PROFILES}/${username}`,
      options
    );
    const data = await response.json();

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error updating listing:", errorData);
      profileEditP.innerHTML = "";
      profileEditP.innerHTML += `
      <p class="text-alertRed-700 text-base"> ${errorData.errors[0].message}</p>
      `;
    }

    form.bio.value = data.data.bio || "";
    form.image.value = data.data.avatar.url || "";
  }
}
getProfile(user);

form.addEventListener("submit", onUpdateProfile);
