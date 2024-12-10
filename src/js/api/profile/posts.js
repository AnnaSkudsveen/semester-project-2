import { API_AUCTION_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

const myListings = document.querySelector(".myListings");

export async function getAllPostsbyUser(username) {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers()
      }
    };
    const response = await fetch(
      `${API_AUCTION_PROFILES}/${username}/listings`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error, status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    showPostsWithButtons(data);
  } catch (error) {
    console.error("An error has occurred:", error.message);
  }
}

export function showPostsWithButtons(postData) {
  myListings.innerHTML = "";

  for (let i = 0; i < postData.data.length; i++) {
    myListings.innerHTML += `
        <section class="listing-post flex-1 w-32 basis-1/4">
        <a class="post-link-card" href="/html/listing/edit/?id=${postData.data[i].id}">
          <div class="h-64 ">
            <img src="${postData.data[i].media.url}" alt="">
            <h2>${postData.data[i].title}</h2>
            <p>${postData.data[i].endsAt}</p>
            <p>${postData.data[i]._count.bids}</p>
            <button>Edit listing</button>
          </div>
          </a>
        </section>
        
        `;
  }
}
