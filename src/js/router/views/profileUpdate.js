import { API_AUCTION_PROFILES } from "../../api/constants.js";
import { headers } from "../../api/headers.js";
import { onUpdateProfile } from "../../ui/profile/update.js";
const bearerToken = localStorage.getItem("bearerToken");

const user = localStorage.getItem("author");
const form = document.forms.updateProfile;

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

    form.bio.value = data.data.bio || "";
    form.image.value = data.data.avatar.url || "";
    form.banner.value = data.data.banner.url || "";
  }
}
getProfile(user);

form.addEventListener("submit", onUpdateProfile);
