import { onUpdateProfile } from "./profileUpdate.js";
import { readProfile } from "../../api/profile/read.js";
import { readProfiles } from "../../api/profile/read.js";

// authGuard();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get("user");

// ?user=hjlpmgtst

readProfile(username);
