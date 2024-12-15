import { API_AUCTION_POSTS } from "../constants.js";
import { headers } from "../headers.js";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const listingId = params.get("id");
const bidP = document.querySelector(".bidP");

/**
 * Places a bid on an auction item by sending the bid amount to the API.
 *
 * This function sends a POST request with the bid amount to the auction API. If the bid is successful, it reloads the page
 * and alerts the user that the bid was placed successfully. If the bid fails, it logs the error and displays an error message.
 *
 * @async
 * @function bidOnItem
 * @param {number|string} bid - The bid amount to be placed on the auction item. Can be a string that will be converted to a number.
 * @throws {Error} Throws an error if the request fails or if the API response is not OK.
 * @returns {Promise<Object>} A promise that resolves to the API response data containing bid details.
 */
export async function bidOnItem(bid) {
  const bidAmount = Number(bid);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers()
    },
    body: JSON.stringify({
      amount: bidAmount
    })
  };

  try {
    const response = await fetch(
      `${API_AUCTION_POSTS}/${listingId}/bids`,
      options
    );

    if (!response.ok) {
      const errorData = await response.json();

      console.error("Error", errorData);
      bidP.innerHTML = "";
      bidP.innerHTML += `
      <p class="text-alertRed-700 text-base"> ${errorData.errors[0].message}</p>`;
    }

    const data = await response.json();

    location.reload();
    alert("Bid placed successfully");

    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
