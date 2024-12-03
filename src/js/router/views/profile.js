// import { onUpdateProfile } from "../../ui/profile/update.js";
import { readProfile } from "../../api/profile/read.js";
import { getAllPostsbyUser } from "../../api/profile/posts.js";

// authGuard();
const username = localStorage.getItem("author");

// ?user=hjlpmgtst

readProfile(username);
getAllPostsbyUser(username);
