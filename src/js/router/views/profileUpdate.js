import { API_AUCTION_PROFILES, API_KEY } from "../../api/constants.js";

const bearerToken = localStorage.getItem("bearerToken");
const user = localStorage.getItem("author");
const form = document.forms.updateProfile;

async function getProfile(username) {
  if (!bearerToken) {
    console.log("Try logging in");
  } else {
    const options = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "X-Noroff-API-Key": `${API_KEY}`
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
