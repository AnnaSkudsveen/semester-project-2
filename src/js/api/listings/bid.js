import { API_AUCTION_POSTS } from "../constants.js";
import { headers } from "../headers.js";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

const listingId = params.get("id");
console.log(listingId);

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
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }

    const data = await response.json();
    console.log("Bid posted successfully:", data);
    location.reload();

    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
