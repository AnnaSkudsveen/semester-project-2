import { API_AUCTION_PROFILES } from "../../api/constants.js";
import { headers } from "../../api/headers.js";
import { onUpdateProfile } from "../../ui/profile/update.js";
import { showNavBar } from "./navBar.js";

const username = localStorage.getItem("author");
showNavBar(username);
const bearerToken = localStorage.getItem("bearerToken");

const user = localStorage.getItem("author");
const form = document.forms.updateProfile;
const profileEditP = document.querySelector(".profileEditP");

async function getProfile(username) {
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
      `${API_AUCTION_PROFILES}/${username}`,
      options
    );
    const data = await response.json();

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error updating listing:", errorData);
      profileEditP.innerHTML = "";
      profileEditP.innerHTML += `
      <p class="text-alertRed-700 text-base"> ${errorData.errors[0].message}</p>
      `;
    }

    form.bio.value = data.data.bio || "";
    form.image.value = data.data.avatar.url || "";
  }
}
getProfile(user);

form.addEventListener("submit", onUpdateProfile);
