import { deleteListing } from "../../api/listings/delete";

/**
 * Handles the deletion of a listing based on its ID.
 *
 * This function prevents the default action of the event, retrieves the listing ID from the current URL, and calls the `deleteListing` function to delete the listing with the given ID.
 *
 * @param {Event} event - The event object that is triggered when the deletion action is invoked, typically from a button click or form submission.
 */
export async function ondeleteListing(event) {
  event.preventDefault();

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const urlId = params.get("id");

  deleteListing(urlId);
}
