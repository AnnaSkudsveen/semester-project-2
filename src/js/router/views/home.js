import { onLogin } from "../../ui/auth/login.js";
import { onRegister } from "../../ui/auth/register.js";
import { API_AUCTION_POSTS } from "../../api/constants.js";
import { headers } from "../../api/headers.js";
import { showNavBar } from "./navBar.js";
import {
  paginate,
  renderPagination,
  showListingsPaginated
} from "../../ui/global/pagination.js";
import { onSearch } from "../../ui/listing/search.js";
import { onLogOut } from "../../ui/global/logout.js";

window.onLogOut = onLogOut;
const bearerToken = localStorage.getItem("bearerToken");

const loginForm = document.forms.login;
const loginModal = document.querySelector(".loginModal");
const registerForm = document.forms.register;
const registerModal = document.querySelector(".registerModal");
const redirectRegisterBtn = document.getElementById("redirectRegister");
const redirectLoginBtn = document.getElementById("redirectLogin");

const searchForm = document.getElementById("searchForm");

loginForm.addEventListener("submit", onLogin);
registerForm.addEventListener("submit", onRegister);

if (searchForm) {
  searchForm.addEventListener("submit", onSearch);
}

redirectRegisterBtn.addEventListener("click", () => {
  registerModal.style.display = "block";
  loginModal.style.display = "none";
});

redirectLoginBtn.addEventListener("click", () => {
  loginModal.style.display = "block";
  registerModal.style.display = "none";
});

if (loginModal) {
  registerModal.style.display = "none";
}

if (bearerToken) {
  console.log("bearerToken exists");

  const username = localStorage.getItem("author");

  loginForm.removeEventListener("submit", onLogin);
  registerForm.removeEventListener("submit", onRegister);

  loginModal.style.display = "none";

  showNavBar(username);
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
