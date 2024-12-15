import { register } from "../../api/auth/register.js";

/**
 * Handles the registration form submission, preventing the default form behavior and calling the `register` function
 * with the entered name, email, and password.
 *
 * @param {Event} event - The event object triggered by the form submission.
 *
 * @example
 * // This function is typically used as an event listener for the registration form submission
 * document.getElementById("registerForm").addEventListener('submit', onRegister);
 */
export async function onRegister(event) {
  event.preventDefault();

  const form = document.getElementById("registerForm");
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  register(name, email, password);
}
