import { search } from "../../api/listings/search.js";

export function onSearch(event) {
  event.preventDefault();
  const form = document.forms.searchForm;
  const query = form.elements["search"].value;
  search(query);
  console.log(`Query: ${query}`);
}
