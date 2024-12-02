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
    <img src="${profileData.banner.url}" alt="Profile banner">
    <img src="${profileData.avatar.url}" alt="Profile picture">
    <h2>${profileData.name}</h2>
    <p>${profileData.bio}</p>
    </div>
      `;
}

export async function readProfiles(limit, page) {}
