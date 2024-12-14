import { API_AUCTION_PROFILES } from "../constants.js";
import { headers } from "../headers.js";
import { onLogOut } from "../../ui/global/logout.js";

window.onLogOut = onLogOut;

export async function readProfile(username) {
  const bearerToken = localStorage.getItem("bearerToken");

  if (!bearerToken) {
    console.log("Try logging in");
  } else {
    const options = {
      headers: {
        "Content-Type": "application/json",
        ...headers()
      }
    };

    const response = await fetch(
      `${API_AUCTION_PROFILES}/${username}`,
      options
    );
    const data = await response.json();
    console.log(data);
    showProfile(data.data);
  }

  // showProfile(data.data);
}

export function showProfile(profileData) {
  const profileSection = document.querySelector(".profileSection");
  profileSection.innerHTML += `
    <div class="flex flex-col items-center">
    <img src="${profileData.avatar.url}" alt="Profile picture" class="rounded-full w-20 h-20 md:h-28 md:w-28">
    <h2 class="text-sm font-bold md:text-lg">${profileData.name}</h2>
    <p class="text-sm w-60 md:w-80">${profileData.bio}</p>
    </div>

    <section class="flex gap-10">
      <div class="flex gap-1">
        <p class="font-bold">${profileData.credits}</p>
        <p>Credits</p>
      </div>

      <div class="flex gap-1">
        <p class="font-bold">${profileData._count.listings}</p>
        <p>Listings</p>
      </div>

      <div class="flex gap-1">
        <p class="font-bold">${profileData._count.wins}</p>
        <p>Wins</p>
      </div>
    </section>
      `;
}

export async function readProfiles(limit, page) {}
