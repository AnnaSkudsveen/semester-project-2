import { API_AUTH_REGISTER } from "../constants.js";

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
    console.log("Registration successful:", data);
    loginRegisterP.innerHTML = `<p>Registration successful! Redirecting to login...</p>`;
    registerModal.style.display = "none";
    loginModal.style.display = "block";
  } catch (error) {
    console.error("Error during registration:", error.message);
    alert("An error occurred during registration. Please try again.");
    throw error;
  }
}
