import { API_AUCTION_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

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
    showProfile(data.data);
  }

  // showProfile(data.data);
}

export function showProfile(profileData) {
  const profileSection = document.querySelector(".profileSection");
  profileSection.innerHTML += `
    <div>

    <img src="${profileData.avatar.url}" alt="Profile picture" class="rounded-full w-20 md:w-28">
    <h2 class="text-sm font-bold md:text-lg">${profileData.name}</h2>
    <p class="text-sm">${profileData.bio}</p>
    </div>
      `;
}

export async function readProfiles(limit, page) {}

/* <img src="${profileData.banner.url}" alt="Profile banner" class=""> */
