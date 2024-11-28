import { API_AUTH_LOGIN } from "../constants.js";

export async function login(email, password) {
  try {
    const response = await fetch(`${API_AUTH_LOGIN}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (!response.ok) {
      throw new Error(`status: ${response.status}`);
    }

    const data = await response.json();
    console.log("data:", data);

    if (data.data && data.data.accessToken) {
      localStorage.setItem("author", data.data.name);
      localStorage.setItem("bearerToken", data.data.accessToken);
      const navBar = document.querySelector(".navBar");

      navBar.innerHTML += `
      <a href="/html/profile/?username=${data.data.name}" id="profileLink">My Profile</a>
      `;

      //TO DO
      //Close login modal using display:none
    } else {
      console.error("Not able to log you in, try again");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
