import { onUpdateProfile } from "../../ui/profile/update.js";
import { readProfile } from "../../api/profile/read.js";
import { readProfiles } from "../../api/profile/read.js";

// authGuard();
const username = localStorage.getItem("author");

// ?user=hjlpmgtst

readProfile(username);
