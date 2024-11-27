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

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      alert("Error: Registration failed. Please try again.");
      throw new Error("Registration failed");
    }

    const data = await response.json();
    console.log("Registration successful:", data);

    // alert("Registration successful!");
    //TO DO
    //Close registration modal, show loader?
    //Redirect to login modal
    window.location.href = "/";
  } catch (error) {
    console.error("Error during registration:", error.message);
    alert("An error occurred during registration. Please try again.");
    throw error;
  }
}
