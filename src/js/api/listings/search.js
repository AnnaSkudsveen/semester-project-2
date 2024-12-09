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
    return data;
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}
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
