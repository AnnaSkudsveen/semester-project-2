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

async function updateCountdown(element, endDate) {
  const endsAt = new Date(`${endDate}`);
  const now = new Date();
  const diff = endsAt - now;

  if (diff <= 0) {
    element.innerText = "Auction ended";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  element.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  setInterval(() => updateCountdown(endDate), 60000);
}

export function showPostsWithButtons(postData) {
  myListings.innerHTML = "";

  for (let i = 0; i < postData.data.length; i++) {
    myListings.innerHTML += `
      <section class="listing-post flex-1 w-32 basis-1/4 gap-5">
        <a class="post-link-card" href="/html/listing/edit/?id=${postData.data[i].id}">
          <div class="h-64 flex flex-col gap-3 mb-3">
            <section class="relative h-36">
              <img src="${postData.data[i].media[0].url}" alt="" class="h-36 w-full object-cover">

              <div class="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div>
            
              <div class="absolute bottom-2 left-2 flex flex-col items-center justify-center ">
                <p class="text-lightText font-bold">${postData.data[i]._count.bids} bids</p>
              </div>
            </section>

            <h2 class="text-base font-bold">${postData.data[i].title}</h2>

            <div class="flex flex-col">
              <p class="countdown text-alertRed-700" data-end-date="${postData.data[i].endsAt}"></p>

              <p class="text-xs text-left">Time left</p>
            </div>

            <button class="hidden">Edit listing</button>
          </div>
        </a>
      </section>
        
        `;
  }
  const countdownElements = document.querySelectorAll(".countdown");
  countdownElements.forEach((element) => {
    const endDate = element.getAttribute("data-end-date");
    updateCountdown(element, endDate);
    setInterval(() => updateCountdown(element, endDate), 1000);
  });
}
