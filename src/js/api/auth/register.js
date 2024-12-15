import { API_AUTH_REGISTER } from "../constants.js";

/**
 * Registers a new user by sending their name, email, and password to the registration API.
 *
 * This function sends a POST request with the user's details (name, email, and password) to the registration API.
 * If successful, it shows a success message, hides the registration modal, and displays the login modal.
 * If the request fails, it logs the error message, alerts the user with the error details, and throws an error.
 *
 * @async
 * @function register
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @throws {Error} Throws an error if the registration request fails or if the response status is not OK.
 */
export async function register(name, email, password) {
  try {
    const response = await fetch(`${API_AUTH_REGISTER}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });

    const loginRegisterP = document.querySelector(".loginRegisterP");
    const registerModal = document.querySelector(".registerModal");
    const loginModal = document.querySelector(".loginModal");

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      alert(`Error: ${errorData.errors[0].message}`);
      throw new Error("Registration failed");
    }

    const data = await response.json();
    loginRegisterP.innerHTML = `<p>Registration successful! Redirecting to login...</p>`;
    registerModal.style.display = "none";
    loginModal.style.display = "block";
  } catch (error) {
    console.error("Error during registration:", error.message);
    alert("An error occurred during registration. Please try again.");
    throw error;
  }
}
