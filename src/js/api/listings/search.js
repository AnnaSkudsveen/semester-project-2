import { API_AUCTION_POSTS } from "../constants.js";
import { headers } from "../headers.js";

export async function search(query) {
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      ...headers()
    }
  };

  try {
    const response = await fetch(
      `${API_AUCTION_POSTS}/search?q=${query}`,
      options
    );
    console.log(`Response status: ${response.status}`);
    if (!response.ok) {
      throw new Error(`Error, status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Response data:", data);

    const searchSectionListings = document.getElementById(
      "searchSectionListings"
    );
    console.log("SearchSection:", searchSectionListings);
    console.log("Search results:", data);
    alert("search function called");
    searchSectionListings.innerHTML = "";
    for (let i = 0; i < data.data.length; i++) {
      searchSectionListings.innerHTML += `
      <div class="flex items-center">
        <img
          src="${data.data[i].media[0].url}"
          alt="${data.data[i].title}"
          class="w-1/2"
        />
        <div class="flex flex-col">
          <h2>${data.data[i].title}</h2>
          <p>${data.data[i].description}</p>
          <p>${data.data[i]._counts.bids}</p>
        </div>
      </div>
      `;
    }
  } catch (error) {
    console.log("Error fetching search results:", error);
  }
}
