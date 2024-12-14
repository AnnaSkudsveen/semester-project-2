import { API_AUCTION_PROFILES } from "../../api/constants.js";
import { headers } from "../../api/headers.js";

const navBar = document.querySelector(".navBar");
const bearerToken = localStorage.getItem("bearerToken");

export async function showNavBar(username) {
  try {
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
    if (bearerToken) {
      navBar.innerHTML += `
      <a href="/" class="flex gap-1 items-center hover:text-primary-500 active:text-primary-500">
        <i class="ph ph-house-simple text-xl"></i>

        <p class="hidden lg:block">Home</p>
      </a>

      <a href="/html/profile/?user=${username}" class="flex gap-1 items-center hover:text-primary-500 active:text-primary-500">
        <i class="ph ph-user text-xl"></i>
        <p class="hidden lg:block">Profile</p>
      </a>
   
      <a href="/html/listing/create/" class="flex gap-1 items-center hover:text-primary-500 active:text-primary-500">
        <i class="ph ph-plus"></i>

        <p class="hidden lg:block">Create listing</p>
      </a>

      <div class="flex gap-1 items-center ">
        
        <p>${data.data.credits}</p>
        <p class="hidden md:block">Credits</p>
      </div>
      <button id="logOutBtn" onclick="onLogOut(event)" class="text-primary-500 hover:underline">Log out</button>
    `;
    }
  } catch (error) {
    console.error("An error has occurred:", error.message);
    throw error;
  }
}
