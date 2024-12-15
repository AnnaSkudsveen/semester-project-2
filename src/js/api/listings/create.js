import { API_AUCTION_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { showNavBar } from "../../router/views/navBar.js";
import { onLogOut } from "../../ui/global/logout.js";
import { onBidOnItem } from "../../ui/listing/bid.js";
import { onSearch } from "../../ui/listing/search.js";

window.onLogOut = onLogOut;
const username = localStorage.getItem("author");
showNavBar(username);
if (searchForm) {
  searchForm.addEventListener("submit", onSearch);
}

const createP = document.querySelector(".createP");

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
    console.log(data);
    alert("Listing created successfully");

    window.location.href = `/html/listing/?id=${data.data.id}`;
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
