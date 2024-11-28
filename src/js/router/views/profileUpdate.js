import { updateProfile } from "../../api/profile/update.js";

export async function onUpdateProfile(event) {
  event.preventDefault();

  const form = document.form.bio;

  updateProfile(username, avatar, banner);
}
