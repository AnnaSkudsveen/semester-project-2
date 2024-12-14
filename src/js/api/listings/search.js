import { API_AUCTION_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { updateCountdown } from "../profile/posts.js";

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
    console.log(data);

    const searchSectionListings = document.getElementById(
      "searchSectionListings"
    );
    console.log("Search results:", data);
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
    const countdownElements = document.querySelectorAll(".countdown");
    countdownElements.forEach((element) => {
      const endDate = element.getAttribute("data-end-date");
      updateCountdown(element, endDate);
      setInterval(() => updateCountdown(element, endDate), 1000);
    });
  } catch (error) {
    console.log("Error fetching search results:", error);
  }
}
