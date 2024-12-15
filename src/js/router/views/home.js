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

/**
 * Sets up event listeners to toggle the display of registration and login modals.
 *
 * - Clicking the "redirectRegisterBtn" shows the registration modal and hides the login modal.
 * - Clicking the "redirectLoginBtn" shows the login modal and hides the registration modal.
 * - Ensures the registration modal is hidden by default if the login modal exists in the DOM.
 */

redirectRegisterBtn.addEventListener("click", () => {
  registerModal.style.display = "block";
  loginModal.style.display = "none";
});

redirectLoginBtn.addEventListener("click", () => {
  loginModal.style.display = "block";
  registerModal.style.display = "none";
});

// Ensure the registration modal is hidden initially if the login modal exists
if (loginModal) {
  registerModal.style.display = "none";
}

if (bearerToken) {
  const username = localStorage.getItem("author");

  loginForm.removeEventListener("submit", onLogin);
  registerForm.removeEventListener("submit", onRegister);

  loginModal.style.display = "none";

  showNavBar(username);
}

/**
 * Fetches all active auction posts from the API, paginates the results,
 * and renders the first page of listings with pagination controls.
 *
 * @async
 * @function getAllPosts
 * @throws {Error} Throws an error if the fetch request fails or if the HTTP response is not OK.
 */

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
