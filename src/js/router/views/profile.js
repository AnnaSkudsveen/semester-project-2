import { readProfile } from "../../api/profile/read.js";
import { getAllPostsbyUser } from "../../api/profile/posts.js";
import { onLogOut } from "../../ui/global/logout.js";
import { showNavBar } from "./navBar.js";

window.onLogOut = onLogOut;

const username = localStorage.getItem("author");
showNavBar(username);

// ?user=hjlpmgtst

readProfile(username);
getAllPostsbyUser(username);
