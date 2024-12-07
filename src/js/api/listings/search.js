import { API_AUCTION_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// const form = document.forms.searchBar;
const bearerToken = localStorage.getItem("bearerToken");
// const searchedItemsSection = document.getElementById("searchedItems");

export async function search(query) {
  if (!bearerToken) {
    console.log("Error");
  } else {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...headers()
      }
    };

    const response = await fetch(`${API_AUCTION_POSTS}/search?q=cool`, options);
    if (!response.ok) {
      throw new Error(`Error, status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    // if (Array.isArray(data.data.media) && data.data.media.length > 0) {
    //   for (let i = 0; i < data.data.media.length; i++) {
    //     searchedItemsSection.innerHTML += `
    //                 <input id="image" type="url" name="image" value="${data.data.media[i].url}"/>
    //                 `;
    //   }
    // } else {
    //   searchedItemsSection.innerHTML += `
    //     <input id="image" type="url" name="image"/>
    //   `;
    // }
  }
}
