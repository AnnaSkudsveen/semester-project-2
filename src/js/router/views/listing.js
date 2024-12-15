import { onBidOnItem } from "../../ui/listing/bid.js";
import { API_AUCTION_POSTS } from "../../api/constants";
import { headers } from "../../api/headers.js";
import { showNavBar } from "./navBar.js";
import { updateCountdown } from "../../api/profile/posts.js";
import { onLogOut } from "../../ui/global/logout.js";
import { onSearch } from "../../ui/listing/search.js";
window.onLogOut = onLogOut;

const bidForm = document.forms.bidModal;
const bearerToken = localStorage.getItem("bearerToken");

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

const listingId = params.get("id");
const username = localStorage.getItem("author");
const listingSection = document.querySelector(".listingSection");
const listingImages = document.querySelector(".listingImages");
const bidsSection = document.querySelector(".bidAmounts");
const smallImgs = document.querySelector(".smallImgs");
const bigImg = document.querySelector(".bigImg");

bidForm.addEventListener("submit", onBidOnItem);
showNavBar(username);

if (searchForm) {
  searchForm.addEventListener("submit", onSearch);
}

async function showListing(id) {
  if (!bearerToken) {
    alert("You need to be logged in to view this page");
    window.location.href = "/";
  } else {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...headers()
      }
    };

    const response = await fetch(
      `${API_AUCTION_POSTS}/${id}?_bids=true`,
      options
    );
    const listingData = await response.json();
    console.log(listingData);

    const media = listingData.data.media;

    if (!media || media.length === 0) {
      bigImg.innerHTML = "<p>No images available</p>";
      smallImgs.innerHTML = "";
      return;
    }

    bigImg.innerHTML = `
      <div class="flex justify-center">
        <img src="${media[0].url}" alt="Main image" class="w-72 sm:w-96 md:w-[606px] lg:w-[424px]">
      </div>
    `;

    smallImgs.innerHTML = "";
    for (let i = 1; i < media.length; i++) {
      smallImgs.innerHTML += `
        <div class="">
          <img src="${media[i].url}" alt="" class="h-20 sm:h-44 md:h-32 w-20 sm:w-44 md:w-32 object-cover">
        </div>
      `;
    }

    listingSection.innerHTML = `
    <section class="listing break-words">
          <h2 class="text-xl font-bold break-words">${listingData.data.title}</h2>
          <p class="break-words">${listingData.data.description}</p>
          
      </section>
    `;

    bidsSection.innerHTML = `
    <div class="flex flex-col gap-2">
      <p class="countdown font-bold text-alertRed-700 text-lg" data-end-date="${listingData.data.endsAt}">${listingData.data.endsAt}</p>
      <div class="flex gap-1">
        <p class="font-bold text-base">${listingData.data._count.bids}</p>
        <p class="font-bold text-base">Bids on item</p>
      </div>
    </div>
  
    `;

    listingData.data.bids.forEach((bid) => {
      bidsSection.innerHTML += `
      <section class="flex gap-2">
        <div>
          <img src="${bid.bidder.avatar.url}" alt="Avatar" class="h-10 w-10 rounded-full object-cover">
        </div>
        <div>
          <h4 class="text-sm">${bid.bidder.name}</h4>      
          <p class="text-sm"><span class="font-bold">${bid.amount}</span> NOK</p>

        </div>
      </section>
      
          `;
    });
    const countdownElement = document.querySelector(".countdown");
    const endDate = countdownElement.getAttribute("data-end-date");
    updateCountdown(countdownElement, endDate);
    setInterval(() => updateCountdown(countdownElement, endDate), 1000);
  }
}
showListing(listingId);
