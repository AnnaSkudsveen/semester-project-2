import { API_KEY, API_AUCTION_PROFILES } from "../constants.js";

export async function readProfile(username) {
  const bearerToken = localStorage.getItem("bearerToken");

  if (bearerToken) {
    const options = {
      headers: {
        //TO DO FIX AUTH HEADERS!
        Authorization: `Bearer ${bearerToken}`,
        "X-Noroff-API-Key": `${API_KEY}`
      }
    };

    const response = await fetch(
      `${API_AUCTION_PROFILES}/${username}`,
      options
    );
    const data = await response.json();
    showProfile(data.data);
  } else {
    authGuard();
  }

  // showProfile(data.data);
}

export function showProfile(profileData) {
  const profileSection = document.querySelector(".profileSection");
  profileSection.innerHTML += `
    <div>
    <img src="${profileData.banner.url}" alt="Profile banner">
    <img src="${profileData.avatar.url}" alt="Profile picture">
    <h2>${profileData.name}</h2>
    <p>${profileData.bio}</p>
    </div>
      `;
}

export async function readProfiles(limit, page) {}
