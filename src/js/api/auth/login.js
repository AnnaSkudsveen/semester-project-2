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

    const loginRegisterP = document.querySelector(".loginRegisterP");
    const registerModal = document.querySelector(".registerModal");
    const loginModal = document.querySelector(".loginModal");
    const redirectRegisterBtn = document.getElementById("redirectRegister");
    const redirectLoginBtn = document.getElementById("redirectLogin");

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      alert(`Error: ${errorData.errors[0].message}`);
      throw new Error("Registration failed");
    }

    const data = await response.json();
    console.log("data:", data);

    if (data.data && data.data.accessToken) {
      localStorage.setItem("author", data.data.name);
      localStorage.setItem("bearerToken", data.data.accessToken);

      const navBar = document.querySelector(".navBar");

      navBar.innerHTML += `
      <a href="/html/profile/?user=${data.data.name}" id="profileLink">My Profile</a>
      `;
    } else {
      console.error("Not able to log you in, try again");
    }
    location.reload();
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
