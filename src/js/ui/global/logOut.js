/**
 * Handles the logout process by clearing the user's authentication token and author information
 * from localStorage, then redirects the user to the homepage.
 *
 * @param {Event} event - The event object triggered by the logout button click.
 *
 * @example
 * // This function is typically used as an event listener for the logout button
 * document.getElementById("logOutBtn").addEventListener('click', onLogOut);
 */
export function onLogOut(event) {
  event.preventDefault();
  localStorage.removeItem("bearerToken");
  localStorage.removeItem("author");
  location.replace("/");
}
