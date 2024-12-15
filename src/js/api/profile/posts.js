import { API_AUCTION_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

const myListings = document.querySelector(".myListings");

/**
 * Fetches all auction listings posted by a specific user.
 *
 * This function sends a GET request to retrieve all auction listings by a user, identified by the `username`.
 * If the request is successful, the listings are passed to a function to display them.
 * If the request fails, an error is logged to the console.
 *
 * @async
 * @function getAllPostsbyUser
 * @param {string} username - The username of the user whose auction listings are to be retrieved.
 * @throws {Error} Throws an error if the GET request fails or the response status is not OK.
 */
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
    showPostsWithButtons(data);
  } catch (error) {
    console.error("An error has occurred:", error.message);
  }
}

/**
 * Updates the countdown display for an auction.
 *
 * This function calculates the remaining time until the specified `endDate` and updates the text content of
 * the provided `element` to show the countdown in the format "Xd Xh Xm Xs". If the auction has ended,
 * it updates the text content to "Auction ended".
 *
 * @param {HTMLElement} element - The DOM element where the countdown will be displayed.
 * @param {string|Date} endDate - The end date of the auction, which can be a string in a valid date format
 * or a Date object.
 */
export async function updateCountdown(element, endDate) {
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
}

/**
 * Displays a list of auction posts with bidding information and a countdown.
 *
 * This function takes in a list of auction posts and dynamically generates HTML to display each post, including:
 * - The post's media (image)
 * - The number of bids placed on the post
 * - The title of the post
 * - A countdown timer showing the time remaining for the auction
 * - A link to edit the post (visible in the layout but hidden by default)
 *
 * It also sets up a countdown timer for each post, updating the time left until the auction ends.
 *
 * @param {Object} postData - The data of auction posts to be displayed.
 * @param {Array} postData.data - An array of auction posts.
 * @param {Object} postData.data[i] - An individual auction post object.
 * @param {string} postData.data[i].id - The unique ID of the auction post.
 * @param {Object} postData.data[i].media - Media associated with the auction post.
 * @param {string} postData.data[i].media[0].url - The URL of the image associated with the post.
 * @param {number} postData.data[i]._count.bids - The number of bids on the auction post.
 * @param {string} postData.data[i].title - The title of the auction post.
 * @param {string} postData.data[i].endsAt - The end date of the auction in ISO format (e.g., "2024-12-31T23:59:59").
 */
export function showPostsWithButtons(postData) {
  myListings.innerHTML = "";

  for (let i = 0; i < postData.data.length; i++) {
    myListings.innerHTML += `
      <section class="listing-post flex-1 basis-1/2 w-32 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 gap-5 max-w-48 items-center justify-center">
        <a class="post-link-card" href="/html/listing/edit/?id=${postData.data[i].id}">
          <div class="h-64 flex flex-col gap-3 mb-3">
            <section class="relative h-36">
              <img src="${postData.data[i].media[0].url}" alt="" class="h-36 w-full object-cover rounded-t-md">

              <div class="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div>
            
              <div class="absolute bottom-2 left-2 flex flex-col items-center justify-center ">
                <p class="text-lightText font-bold">${postData.data[i]._count.bids} bids</p>
              </div>
            </section>

            <h2 class="text-base font-bold">${postData.data[i].title}</h2>

            <div class="flex flex-col">
              <p class="countdown text-alertRed-700" data-end-date="${postData.data[i].endsAt}">${postData.data[i].endsAt}</p>

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
