import { onBidOnItem } from "../../ui/listing/bid.js";
import { API_AUCTION_POSTS } from "../../api/constants";
import { headers } from "../../api/headers.js";
const bidForm = document.forms.bidModal;
const bearerToken = localStorage.getItem("bearerToken");

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

const listingId = params.get("id");
const listingSection = document.querySelector(".listingSection");
const listingImages = document.querySelector(".listingImages");
const bidsSection = document.querySelector(".bidAmounts");

bidForm.addEventListener("submit", onBidOnItem);

async function showListing(id) {
  if (!bearerToken) {
    console.log("Try logging in");
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

    listingData.data.media.forEach((mediaItem) => {
      listingImages.innerHTML += `
          <img src="${mediaItem.url}" alt="picture of listed item">
        `;
    });

    listingSection.innerHTML = `
    <section class="listing">
          <h2>${listingData.data.title}</h2>
          <p>${listingData.data.endsAt}</p>
          <p>${listingData.data._count.bids}</p>
      </section>
    `;

    listingData.data.bids.forEach((bid) => {
      bidsSection.innerHTML += `
      <h4>${bid.bidder.name}</h4>      
      <p>${bid.amount}</p>
          `;
    });
  }
}
showListing(listingId);
