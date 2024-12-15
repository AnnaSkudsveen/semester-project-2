import { login } from "../../api/auth/login.js";

/**
 * Handles the login form submission, preventing the default form behavior and calling the `login` function
 * with the entered email and password.
 *
 * @param {Event} event - The event object triggered by the form submission.
 *
 * @example
 * // This function is typically used as an event listener for the login form submission
 * document.forms.login.addEventListener('submit', onLogin);
 */
export async function onLogin(event) {
  event.preventDefault();

  const form = document.forms.login;
  const email = form.email.value;
  const password = form.password.value;

  login(email, password);
}
