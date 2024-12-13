import { API_AUCTION_POSTS } from "../../api/constants.js";
import { headers } from "../../api/headers.js";
import { onUpdateListing } from "../../ui/listing/update.js";
import { ondeleteListing } from "../../ui/listing/delete.js";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const urlId = params.get("id");
const form = document.forms.updateListing;
const bearerToken = localStorage.getItem("bearerToken");
const imageDiv = document.getElementById("editListingImageDiv");
const deleteBtn = document.getElementById("deleteBtnEdit");
const editP = document.querySelector(".editP");

async function getListing(id) {
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

    const response = await fetch(`${API_AUCTION_POSTS}/${id}`, options);
    const data = await response.json();
    console.log(data);

    form.title.value = data.data.title || "";
    form.body.value = data.data.description || "";
    form.tags.value = data.data.tags || "";
    imageDiv.innerHTML = "";

    if (Array.isArray(data.data.media) && data.data.media.length > 0) {
      for (let i = 0; i < data.data.media.length; i++) {
        imageDiv.innerHTML += `
                    <input id="image" type="url" name="image" value="${data.data.media[i].url}" class="h-9 w-full"/>
                    `;
      }
    } else {
      imageDiv.innerHTML += `
        <input id="image" type="url" name="image" class="h-9 w-full"/>
      `;
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error updating listing:", errorData);
      editP.innerHTML = "";
      editP.innerHTML += `
      <p class="text-alertRed-700 text-base"> ${errorData.errors[0].message}</p>
      `;
    }
  }
}
getListing(urlId);

form.addEventListener("submit", onUpdateListing);
deleteBtn.addEventListener("click", ondeleteListing);
