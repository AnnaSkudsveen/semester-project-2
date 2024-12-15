import { headers } from "../headers.js";
import { API_AUCTION_POSTS } from "../constants.js";
import { showNavBar } from "../../router/views/navBar.js";
import { onLogOut } from "../../ui/global/logout.js";
import { onSearch } from "../../ui/listing/search.js";

window.onLogOut = onLogOut;

const username = localStorage.getItem("author");
const editP = document.querySelector(".editP");

showNavBar(username);
if (searchForm) {
  searchForm.addEventListener("submit", onSearch);
}

/**
 * Updates an existing auction listing by sending a PUT request to the API.
 *
 * This function sends a PUT request to update the details of an auction listing, including the title, description,
 * and media (image). If the update is successful, the page is redirected to the updated listing's details page.
 * If the request fails, an error message is displayed in the UI.
 *
 * @async
 * @function updateListing
 * @param {string|number} id - The unique identifier of the auction listing to be updated.
 * @param {string} title - The new title of the auction listing.
 * @param {string} body - The new description or body text of the auction listing.
 * @param {string} image - The URL of the new image to be associated with the listing.
 * @throws {Error} Throws an error if the PUT request fails or the response status is not OK.
 * @returns {Promise<Object>} A promise that resolves to the updated listing data from the API.
 */
export async function updateListing(id, title, body, image) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers()
    },
    body: JSON.stringify({
      title: `${title}`,
      media: [{ url: `${image}` }],
      description: `${body}`
    })
  };

  try {
    const response = await fetch(`${API_AUCTION_POSTS}/${id}`, options);

    const data = await response.json();

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error updating listing:", errorData);
      editP.innerHTML = "";
      editP.innerHTML += `
      <p class="text-alertRed-700 text-base"> ${errorData.errors[0].message}</p>
      `;
    }
    alert("listing updated successfully");
    window.location.href = `/html/listing/?id=${id}`;
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
