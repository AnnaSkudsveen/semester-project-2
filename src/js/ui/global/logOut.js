export function onLogOut(event) {
  event.preventDefault();
  localStorage.removeItem("bearerToken");
  localStorage.removeItem("author");
  location.replace("/");
}
