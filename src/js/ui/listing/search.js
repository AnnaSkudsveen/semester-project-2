import { search } from "../../api/listings/search.js";

/**
 * Handles the search functionality by retrieving the search query and passing it to the search function.
 *
 * This function prevents the default behavior of the event, retrieves the search query entered by the user in the search form, and calls the `search` function to perform the search.
 *
 * @param {Event} event - The event object that is triggered when the search form is submitted (usually a form submission or button click).
 */
export function onSearch(event) {
  event.preventDefault();
  const form = document.forms.searchForm;
  const query = form.elements["search"].value;
  search(query);
}
