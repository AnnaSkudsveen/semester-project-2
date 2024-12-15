import { updateListing } from "../../api/listings/update.js";

/**
 * Handles the update of a listing by retrieving the listing ID from the URL and the form data, then passing them to the `updateListing` function.
 *
 * This function prevents the default form submission behavior, extracts the listing ID from the URL, and retrieves the updated listing details (title, image, body) from the form. It then calls the `updateListing` function to perform the update operation.
 *
 * @param {Event} event - The event object that is triggered when the update listing form is submitted (usually a form submission or button click).
 */
export async function onUpdateListing(event) {
  event.preventDefault();

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const urlId = params.get("id");
  const form = document.forms.updateListing;
  const title = form.title.value;
  const image = form.image.value;
  const body = form.body.value;

  updateListing(urlId, title, body, image);
}
