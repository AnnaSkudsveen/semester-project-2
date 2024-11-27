import { register } from "../../api/auth/register.js";

export async function onRegister(event) {
  event.preventDefault();

  const form = document.getElementById("registerForm");
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;

  register(name, email, password);
  console.log("onRegister", name, email, password);
}
