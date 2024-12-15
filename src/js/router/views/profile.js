import { readProfile } from "../../api/profile/read.js";
import { getAllPostsbyUser } from "../../api/profile/posts.js";
import { onLogOut } from "../../ui/global/logout.js";
import { showNavBar } from "./navBar.js";
import { onSearch } from "../../ui/listing/search.js";

window.onLogOut = onLogOut;

const username = localStorage.getItem("author");
showNavBar(username);
if (searchForm) {
  searchForm.addEventListener("submit", onSearch);
}

readProfile(username);
getAllPostsbyUser(username);
