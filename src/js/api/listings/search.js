import { API_AUCTION_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { updateCountdown } from "../profile/posts.js";

const searchSectionListings = document.getElementById("searchSectionListings");

/**
 * Searches for auction listings based on the provided query and updates the search results section.
 *
 * This function sends a GET request to the API with the search query and retrieves matching auction listings.
 * If the request is successful, it dynamically populates the search results section with the listings' details.
 * Additionally, it handles the countdown for auction end times and manages the visibility of the search results dropdown.
 *
 * @async
 * @function search
 * @param {string} query - The search query entered by the user to filter auction listings.
 * @throws {Error} Throws an error if the GET request fails or if the response status is not OK.
 */
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
    if (!response.ok) {
      throw new Error(`Error, status: ${response.status}`);
    }
    const data = await response.json();

    searchSectionListings.innerHTML = "";
    for (let i = 0; i < data.data.length; i++) {
      searchSectionListings.innerHTML += `
      <a href="/html/listing/?id=${data.data[i].id}" class="bg-lightText pb-2">
      <div class="flex items-center gap-2 pl-4 border-b border-primary-300">
        <img
          src="${data.data[i].media[0].url}"
          alt="${data.data[i].title}"
          class="w-10 object-contain"
        />
        <div class="flex flex-col">
          <h2>${data.data[i].title}</h2>
          <p>${data.data[i]._count.bids} bids</p>
          <p class="countdown text-alertRed-700" data-end-date="${data.data[i].endsAt}">${data.data[i].endsAt}</p>
        </div>
      </div>
      </a>
      `;
    }

    document.addEventListener("click", (event) => {
      const searchSection = document.querySelector(".searchSection");

      if (!searchSection.contains(event.target)) {
        searchSectionListings.classList.add("hidden");
      }
    });

    const searchInput = document.getElementById("search");
    searchInput.addEventListener("focus", () => {
      searchSectionListings.classList.remove("hidden");
    });

    const countdownElements = document.querySelectorAll(".countdown");
    countdownElements.forEach((element) => {
      const endDate = element.getAttribute("data-end-date");
      updateCountdown(element, endDate);
      setInterval(() => updateCountdown(element, endDate), 1000);
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}
