import { API_AUCTION_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { showNavBar } from "../../router/views/navBar.js";
import { onLogOut } from "../../ui/global/logout.js";
import { onSearch } from "../../ui/listing/search.js";

window.onLogOut = onLogOut;
const username = localStorage.getItem("author");
const createP = document.querySelector(".createP");

showNavBar(username);
if (searchForm) {
  searchForm.addEventListener("submit", onSearch);
}

/**
 * Creates a new auction listing by sending a POST request to the auction API.
 *
 * This function sends the provided details (title, media, description, end time, and tags) to the API to create a new auction listing.
 * If the listing creation is successful, the page is redirected to the newly created listing's details page.
 * If the request fails, it logs the error and displays an error message.
 *
 * @async
 * @function createListing
 * @param {string} title - The title of the auction listing.
 * @param {string} media - The URL of the media (e.g., image or video) associated with the listing.
 * @param {string} body - A description or body text of the auction listing.
 * @param {string} endsAt - The end date and time for the auction listing (in ISO format).
 * @param {string|Array<string>} tags - The tags associated with the listing, either a single string or an array of strings.
 * @throws {Error} Throws an error if the POST request fails or the response status is not OK.
 * @returns {Promise<Object>} A promise that resolves to the API response data containing the newly created listing's details.
 */
export async function createListing(title, media, body, endsAt, tags) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers()
    },
    body: JSON.stringify({
      title: `${title}`,
      description: `${body}`,
      endsAt: `${endsAt}`,
      tags: [`${tags}`],
      media: [
        {
          url: `${media}`
        }
      ]
    })
  };

  try {
    const response = await fetch(`${API_AUCTION_POSTS}`, options);

    if (!response.ok) {
      const errorData = await response.json();

      console.error("Error posting listing", errorData);

      createP.innerHTML += `
      <p class="text-alertRed-700 text-base"> ${errorData.errors[0].message}</p>`;

      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }

    const data = await response.json();
    alert("Listing created successfully");

    window.location.href = `/html/listing/?id=${data.data.id}`;
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
