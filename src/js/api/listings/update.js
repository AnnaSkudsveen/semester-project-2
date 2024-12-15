import { headers } from "../headers.js";
import { API_AUCTION_POSTS } from "../constants.js";
import { showNavBar } from "../../router/views/navBar.js";
import { onLogOut } from "../../ui/global/logout.js";
import { onSearch } from "../../ui/listing/search.js";

window.onLogOut = onLogOut;

const username = localStorage.getItem("author");
const editP = document.querySelector(".editP");

showNavBar(username);
if (searchForm) {
  searchForm.addEventListener("submit", onSearch);
}

export async function updateListing(id, title, body, image) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers()
    },
    body: JSON.stringify({
      title: `${title}`,
      media: [{ url: `${image}` }],
      description: `${body}`
    })
  };

  try {
    const response = await fetch(`${API_AUCTION_POSTS}/${id}`, options);

    const data = await response.json();

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error updating listing:", errorData);
      editP.innerHTML = "";
      editP.innerHTML += `
      <p class="text-alertRed-700 text-base"> ${errorData.errors[0].message}</p>
      `;
    }
    alert("listing updated successfully");
    window.location.href = `/html/listing/?id=${id}`;
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
