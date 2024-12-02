import { onLogin } from "../../ui/auth/login.js";
import { onRegister } from "../../ui/auth/register.js";

const loginForm = document.forms.login;
const registerForm = document.getElementById("registerForm");
const bearerToken = localStorage.getItem("bearerToken");

loginForm.addEventListener("submit", onLogin);
registerForm.addEventListener("submit", onRegister);
