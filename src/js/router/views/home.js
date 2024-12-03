import { onLogin } from "../../ui/auth/login.js";
import { onRegister } from "../../ui/auth/register.js";
import { API_AUCTION_POSTS } from "../../api/constants.js";
import { headers } from "../../api/headers.js";
import { showUserCredit } from "./navBar.js";

const loginForm = document.forms.login;
const registerForm = document.getElementById("registerForm");
const bearerToken = localStorage.getItem("bearerToken");
const listingsSection = document.querySelector(".listingsSection");

loginForm.addEventListener("submit", onLogin);
registerForm.addEventListener("submit", onRegister);

const showAllPosts = async function () {
  try {
    const response = await fetch(`${API_AUCTION_POSTS}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", ...headers }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    showPosts(data);
  } catch (error) {
    console.error("An error has occurred:", error.message);
  }
};

if (bearerToken) {
  const navBar = document.querySelector(".navBar");
  const username = localStorage.getItem("author");
  navBar.innerHTML += `
    <a href="/html/profile/?user=${username}" id="profileLink">My Profile</a>
    `;
  showUserCredit(username);
  loginForm.style.display = "none";
  registerForm.style.display = "none";

  showAllPosts();
}

function showPosts(postData) {
  for (let i = 0; i < postData.data.length; i++) {
    listingsSection.innerHTML += `
      <a class="post-link-card" href="html/listing/?id=${postData.data[i].id}">
      <section class="listing-post">
        <div class="img-header">
          <img src="${postData.data[i].media.url}" alt="">
          <h2>${postData.data[i].title}</h2>
          <p>${postData.data[i].endsAt}</p>
          <p>${postData.data[i]._count.bids}</p>
        </div>
      </section>
      </a>
      `;
  }
}

{
  /* <div class="post-card-btns">
<button class="editBtn">Edit</button>
<button class="editBtn">Delete</button>
</div> */
}
