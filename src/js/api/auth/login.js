import { API_AUTH_LOGIN } from "../constants.js";

/**
 * Logs in a user by sending an email and password to the authentication API.
 *
 * This function sends a POST request with the user's email and password to the login API.
 * If successful, it stores the user's name and access token in `localStorage` and reloads the page.
 * If the request fails, it logs the error message, shows an alert with the error details, and throws an error.
 *
 * @async
 * @function login
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @throws {Error} Throws an error if the login request fails or if the response status is not OK.
 */
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
      const errorData = await response.json();
      console.error("Error:", errorData);
      alert(`Error: ${errorData.errors[0].message}`);
      throw new Error("Registration failed");
    }

    const data = await response.json();

    if (data.data && data.data.accessToken) {
      localStorage.setItem("author", data.data.name);
      localStorage.setItem("bearerToken", data.data.accessToken);
    } else {
      console.error("Not able to log you in, try again");
    }
    location.reload();
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
