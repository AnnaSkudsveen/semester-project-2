import { updateProfile } from "../../api/profile/update.js";

/**
 * Handles the update of a user's profile by retrieving the user's username from local storage and the updated profile data from the form, then passing them to the `updateProfile` function.
 *
 * This function prevents the default form submission behavior, extracts the username from local storage, and retrieves the updated bio and image from the form. It then calls the `updateProfile` function to update the user's profile.
 *
 * @param {Event} event - The event object triggered when the update profile form is submitted (typically a form submission or button click).
 */
export async function onUpdateProfile(event) {
  event.preventDefault();

  const username = localStorage.getItem("author");
  const form = document.forms.updateProfile;
  const bio = form.bio.value;
  const image = form.image.value;

  updateProfile(username, bio, image);
}
