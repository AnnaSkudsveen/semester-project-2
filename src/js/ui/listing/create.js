import { createListing } from "../../api/listings/create";

/**
 * Handles the form submission for creating a new listing.
 *
 * This function prevents the default form submission, collects the values from the form fields, and calls the `createListing` function to create a new listing with the provided details.
 *
 * @param {Event} event - The event object from the form submission. It contains details about the user's interaction with the form.
 */
export async function onCreateListing(event) {
  event.preventDefault();

  const form = document.forms.createListing;
  const title = form.title.value;
  const body = form.description.value;
  const media = form.image.value;
  const endsAt = form.endsAt.value;
  const tags = form.tags.value;

  createListing(title, media, body, endsAt, tags);
}
