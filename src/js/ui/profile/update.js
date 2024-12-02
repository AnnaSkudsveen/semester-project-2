import { updateProfile } from "../../api/profile/update.js";

export async function onUpdateProfile(event) {
  event.preventDefault();

  const username = localStorage.getItem("author");
  const form = document.forms.updateProfile;
  const bio = form.bio.value;
  const image = form.image.value;
  const banner = form.banner.value;

  updateProfile(username, bio, image, banner);
}
