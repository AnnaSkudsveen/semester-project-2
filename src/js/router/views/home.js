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
    const response = await fetch(`${API_AUCTION_POSTS}`, options);
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

// function showListings(postData) {
//   listingsSection.innerHTML = "";
//   // postData;
//   for (let i = 0; i < postData.length; i++) {
//     listingsSection.innerHTML += `
//         <a class="post-link-card" href="html/listing/?id=${postData[i].id}">
//         <section class="listing-post">
//           <div class="img-header">
//             <img src="${postData[i].media.url}" alt="">
//             <h2>${postData[i].title}</h2>
//             <p>${postData[i].endsAt}</p>
//             <p>${postData[i]._count.bids}</p>
//           </div>
//         </section>
//         </a>
//         `;
//   }
// }

/* <div class="post-card-btns">
<button class="editBtn">Edit</button>
<button class="editBtn">Delete</button>
</div> */
