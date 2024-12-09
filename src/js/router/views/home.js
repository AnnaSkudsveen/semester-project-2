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

const loginForm = document.forms.login;
const registerForm = document.forms.register;
const bearerToken = localStorage.getItem("bearerToken");
const listingsSection = document.querySelector(".listingsSection");

const loginBtn = document.querySelector(".loginBtn");
const registerBtn = document.querySelector(".registerBtn");
const searchForm = document.getElementById("searchForm");
const searchBtn = document.getElementById("searchBtn");
console.log(searchForm);


loginForm.addEventListener("submit", onLogin);
registerForm.addEventListener("submit", onRegister);

if (searchForm) {
  searchForm.addEventListener("submit", onSearch);
}

if (bearerToken) {
  const navBar = document.querySelector(".navBar");
  const username = localStorage.getItem("author");
  navBar.innerHTML += `
    <a href="/html/profile/?user=${username}" id="profileLink">My Profile</a>
    `;
  showUserCredit(username);
  loginForm.style.display = "none";
  registerForm.style.display = "none";
  console.log("remove eventlisteners");
  loginForm.removeEventListener("submit", onLogin);
  registerForm.removeEventListener("submit", onRegister);

  getAllPosts();
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
    const paginatedPosts = paginate(data.data, 32);

    renderPagination(paginatedPosts);
    showListingsPaginated(paginatedPosts[0]);
  } catch (error) {
    console.error("An error has occurred:", error.message);
  }
}
getAllPosts();

if (bearerToken) {
  const navBar = document.querySelector(".navBar");
  const username = localStorage.getItem("author");
  navBar.innerHTML += `
    <a href="/html/profile/?user=${username}" id="profileLink">My Profile</a>
    `;
  showUserCredit(username);
  loginForm.removeEventListener("submit", onLogin);
  registerForm.removeEventListener("submit", onRegister);
  loginForm.style.display = "none";
  registerForm.style.display = "none";
  console.log(loginBtn);
  console.log(registerBtn);
  loginBtn.innerText = "Logout";
  registerBtn.style.display = "none";
}
