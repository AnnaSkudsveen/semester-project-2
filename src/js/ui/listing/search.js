import { search } from "../../api/listings/search.js";

export function onSearch(event) {
  // event.stopImmediatePropagation();
  console.log("onSearch triggered");
  event.preventDefault();
  console.log("Default prevented");

  const form = document.forms.searchForm;
  const query = form.search.value;

  // search(query);
  // console.log(`Query: ${query}`);
}
