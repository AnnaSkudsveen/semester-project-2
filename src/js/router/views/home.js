import { onLogin } from "../../ui/auth/login.js";
import { onRegister } from "../../ui/auth/register.js";
import { API_AUCTION_POSTS } from "../../api/constants.js";
import { headers } from "../../api/headers.js";
import { showUserCredit } from "./navBar.js";
import {
  paginate,
  renderPagination,
  showListingsPaginated
} from "../../ui/global/pagination.js";
import { onSearch } from "../../ui/listing/search.js";
import { onLogOut } from "../../ui/global/logout.js";

window.onLogOut = onLogOut;

const loginForm = document.forms.login;
const registerForm = document.forms.register;
const bearerToken = localStorage.getItem("bearerToken");
const searchForm = document.getElementById("searchForm");
const searchFormBtn = document.getElementById("searchBtn");

loginForm.addEventListener("submit", onLogin);
registerForm.addEventListener("submit", onRegister);

if (searchForm) {
  searchForm.addEventListener("submit", onSearch);
}

if (bearerToken) {
  console.log("bearerToken exists");
  const navBar = document.querySelector(".navBar");
  const username = localStorage.getItem("author");
  navBar.innerHTML += `
  <a href="/html/profile/?user=${username}" class="flex gap-2">
                <i class="ph ph-user text-xl"></i>
                <p class="hidden lg:block">Profile</p>
            </a>
   
    <button id="logOutBtn" onclick="onLogOut(event)">Log out</button>
    `;

  const logOutBtn = document.getElementById("logOutBtn");
  console.log(logOutBtn);

  loginForm.removeEventListener("submit", onLogin);
  registerForm.removeEventListener("submit", onRegister);
  loginForm.style.display = "none";
  registerForm.style.display = "none";
  showUserCredit(username);
  // console.log(onLogOut);
  // console.log(onSearch);
  // logOutBtn.removeEventListener("click", onLogOut);
  // if (logOutBtn) {
  //   console.log("Adding event listener to logOutBtn");
  //   logOutBtn.addEventListener("click", onLogOut, { capture: true });
  //   console.log("logOutBtn event listener added");
  // } else {
  //   console.log("logOutBtn is not found");
  // }
}

async function getAllPosts() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers()
      }
    };
    const response = await fetch(`${API_AUCTION_POSTS}?_active=true`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const paginatedPosts = paginate(data.data, 20);

    renderPagination(paginatedPosts);
    showListingsPaginated(paginatedPosts[0]);
  } catch (error) {
    console.error("An error has occurred:", error.message);
  }
}
getAllPosts();
