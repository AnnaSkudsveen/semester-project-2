import { API_AUCTION_PROFILES } from "../../api/constants.js";
import { headers } from "../../api/headers.js";

const navBar = document.querySelector(".navBar");

export async function showUserCredit(username) {
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
    navBar.innerHTML += `
    <div>
     <p>Credits:</p>
     <p>${data.data.credits}</p>
    </div>
   
    `;
  } catch (error) {
    console.error("An error has occurred:", error.message);
    throw error;
  }
}
